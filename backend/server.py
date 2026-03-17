from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import asyncio
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Resend Config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    token: str
    email: str

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client: str
    industry: str
    challenge: str
    solution: str
    impact: str
    metrics: List[dict]
    image_url: Optional[str] = None
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CaseStudyCreate(BaseModel):
    title: str
    client: str
    industry: str
    challenge: str
    solution: str
    impact: str
    metrics: List[dict]
    image_url: Optional[str] = None
    published: bool = True

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    category: str
    image_url: Optional[str] = None
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    category: str
    image_url: Optional[str] = None
    published: bool = True

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class DemoRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str
    role: str
    phone: Optional[str] = None
    employees: str
    services_interested: List[str]
    timeline: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: str
    phone: Optional[str] = None
    employees: str
    services_interested: List[str]
    timeline: str
    message: Optional[str] = None

class Career(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str
    description: str
    requirements: List[str]
    responsibilities: List[str]
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CareerCreate(BaseModel):
    title: str
    department: str
    location: str
    type: str
    description: str
    requirements: List[str]
    responsibilities: List[str]
    published: bool = True

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(email: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    payload = {"email": email, "exp": expiration}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        user = await db.users.find_one({"email": email}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# ==================== EMAIL HELPER ====================

async def send_email_async(recipient: str, subject: str, html_content: str):
    params = {
        "from": SENDER_EMAIL,
        "to": [recipient],
        "subject": subject,
        "html": html_content
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {recipient}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")

# ==================== AUTH ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Nexora Systems API"}

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserLogin):
    existing = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(email=user_data.email, password_hash=hash_password(user_data.password))
    doc = user.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.users.insert_one(doc)
    
    token = create_jwt_token(user.email)
    return TokenResponse(token=token, email=user.email)

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if not user or not verify_password(user_data.password, user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(user['email'])
    return TokenResponse(token=token, email=user['email'])

@api_router.get("/auth/verify")
async def verify_auth(email: str = Depends(verify_token)):
    return {"authenticated": True, "email": email}

# ==================== CASE STUDIES ====================

@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies(published_only: bool = True):
    query = {"published": True} if published_only else {}
    studies = await db.case_studies.find(query, {"_id": 0}).to_list(100)
    for study in studies:
        if isinstance(study['created_at'], str):
            study['created_at'] = datetime.fromisoformat(study['created_at'])
    return studies

@api_router.get("/case-studies/{study_id}", response_model=CaseStudy)
async def get_case_study(study_id: str):
    study = await db.case_studies.find_one({"id": study_id}, {"_id": 0})
    if not study:
        raise HTTPException(status_code=404, detail="Case study not found")
    if isinstance(study['created_at'], str):
        study['created_at'] = datetime.fromisoformat(study['created_at'])
    return study

@api_router.post("/case-studies", response_model=CaseStudy)
async def create_case_study(data: CaseStudyCreate, email: str = Depends(verify_token)):
    study = CaseStudy(**data.model_dump())
    doc = study.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.case_studies.insert_one(doc)
    return study

@api_router.put("/case-studies/{study_id}", response_model=CaseStudy)
async def update_case_study(study_id: str, data: CaseStudyCreate, email: str = Depends(verify_token)):
    existing = await db.case_studies.find_one({"id": study_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    updated_data = data.model_dump()
    await db.case_studies.update_one({"id": study_id}, {"$set": updated_data})
    
    study = await db.case_studies.find_one({"id": study_id}, {"_id": 0})
    if isinstance(study['created_at'], str):
        study['created_at'] = datetime.fromisoformat(study['created_at'])
    return CaseStudy(**study)

@api_router.delete("/case-studies/{study_id}")
async def delete_case_study(study_id: str, email: str = Depends(verify_token)):
    result = await db.case_studies.delete_one({"id": study_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Case study not found")
    return {"message": "Case study deleted"}

# ==================== BLOG ====================

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(published_only: bool = True):
    query = {"published": True} if published_only else {}
    posts = await db.blog_posts.find(query, {"_id": 0}).to_list(100)
    for post in posts:
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(data: BlogPostCreate, email: str = Depends(verify_token)):
    post = BlogPost(**data.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, data: BlogPostCreate, email: str = Depends(verify_token)):
    existing = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    updated_data = data.model_dump()
    await db.blog_posts.update_one({"id": post_id}, {"$set": updated_data})
    
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return BlogPost(**post)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, email: str = Depends(verify_token)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted"}

# ==================== CONTACT ====================

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(data: ContactSubmissionCreate):
    submission = ContactSubmission(**data.model_dump())
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Company:</strong> {data.company or 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>{data.message}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Submitted at: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
        </body>
    </html>
    """
    await send_email_async(SENDER_EMAIL, f"New Contact: {data.name}", html_content)
    
    return submission

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions(email: str = Depends(verify_token)):
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(100)
    for sub in submissions:
        if isinstance(sub['created_at'], str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    return submissions

@api_router.patch("/contact/{submission_id}/status")
async def update_contact_status(submission_id: str, status: str, email: str = Depends(verify_token)):
    result = await db.contact_submissions.update_one({"id": submission_id}, {"$set": {"status": status}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"message": "Status updated"}

# ==================== DEMO REQUESTS ====================

@api_router.post("/demo-request", response_model=DemoRequest)
async def submit_demo_request(data: DemoRequestCreate):
    request = DemoRequest(**data.model_dump())
    doc = request.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.demo_requests.insert_one(doc)
    
    # Send email notification
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Demo Request</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Company:</strong> {data.company}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Phone:</strong> {data.phone or 'N/A'}</p>
            <p><strong>Company Size:</strong> {data.employees}</p>
            <p><strong>Services Interested:</strong> {', '.join(data.services_interested)}</p>
            <p><strong>Timeline:</strong> {data.timeline}</p>
            <p><strong>Additional Message:</strong></p>
            <p>{data.message or 'N/A'}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Submitted at: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
        </body>
    </html>
    """
    await send_email_async(SENDER_EMAIL, f"Demo Request: {data.company}", html_content)
    
    return request

@api_router.get("/demo-request", response_model=List[DemoRequest])
async def get_demo_requests(email: str = Depends(verify_token)):
    requests = await db.demo_requests.find({}, {"_id": 0}).to_list(100)
    for req in requests:
        if isinstance(req['created_at'], str):
            req['created_at'] = datetime.fromisoformat(req['created_at'])
    return requests

@api_router.patch("/demo-request/{request_id}/status")
async def update_demo_status(request_id: str, status: str, email: str = Depends(verify_token)):
    result = await db.demo_requests.update_one({"id": request_id}, {"$set": {"status": status}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Status updated"}

# ==================== CAREERS ====================

@api_router.get("/careers", response_model=List[Career])
async def get_careers(published_only: bool = True):
    query = {"published": True} if published_only else {}
    careers = await db.careers.find(query, {"_id": 0}).to_list(100)
    for career in careers:
        if isinstance(career['created_at'], str):
            career['created_at'] = datetime.fromisoformat(career['created_at'])
    return careers

@api_router.get("/careers/{career_id}", response_model=Career)
async def get_career(career_id: str):
    career = await db.careers.find_one({"id": career_id}, {"_id": 0})
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")
    if isinstance(career['created_at'], str):
        career['created_at'] = datetime.fromisoformat(career['created_at'])
    return career

@api_router.post("/careers", response_model=Career)
async def create_career(data: CareerCreate, email: str = Depends(verify_token)):
    career = Career(**data.model_dump())
    doc = career.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.careers.insert_one(doc)
    return career

@api_router.put("/careers/{career_id}", response_model=Career)
async def update_career(career_id: str, data: CareerCreate, email: str = Depends(verify_token)):
    existing = await db.careers.find_one({"id": career_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Career not found")
    
    updated_data = data.model_dump()
    await db.careers.update_one({"id": career_id}, {"$set": updated_data})
    
    career = await db.careers.find_one({"id": career_id}, {"_id": 0})
    if isinstance(career['created_at'], str):
        career['created_at'] = datetime.fromisoformat(career['created_at'])
    return Career(**career)

@api_router.delete("/careers/{career_id}")
async def delete_career(career_id: str, email: str = Depends(verify_token)):
    result = await db.careers.delete_one({"id": career_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Career not found")
    return {"message": "Career deleted"}

# ==================== DASHBOARD STATS ====================

@api_router.get("/dashboard/stats")
async def get_dashboard_stats(email: str = Depends(verify_token)):
    case_studies_count = await db.case_studies.count_documents({"published": True})
    blog_posts_count = await db.blog_posts.count_documents({"published": True})
    contact_submissions = await db.contact_submissions.count_documents({"status": "new"})
    demo_requests = await db.demo_requests.count_documents({"status": "pending"})
    careers_count = await db.careers.count_documents({"published": True})
    
    return {
        "case_studies": case_studies_count,
        "blog_posts": blog_posts_count,
        "pending_contacts": contact_submissions,
        "pending_demos": demo_requests,
        "active_jobs": careers_count
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()