import asyncio
import sys
sys.path.append('/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import bcrypt
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path('/app/backend')
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

async def seed_data():
    print("Seeding database...")
    
    # Create admin user
    admin_exists = await db.users.find_one({"email": "admin@nexora.systems"})
    if not admin_exists:
        admin = {
            "id": str(uuid.uuid4()),
            "email": "admin@nexora.systems",
            "password_hash": hash_password("admin123"),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin)
        print("✓ Admin user created (email: admin@nexora.systems, password: admin123)")
    else:
        print("✓ Admin user already exists")
    
    # Sample Case Studies
    case_studies_count = await db.case_studies.count_documents({})
    if case_studies_count == 0:
        case_studies = [
            {
                "id": str(uuid.uuid4()),
                "title": "Global Bank Digital Transformation",
                "client": "Fortune 500 Bank",
                "industry": "Financial Services",
                "challenge": "Legacy infrastructure hindering innovation, manual processes causing delays, limited real-time insights.",
                "solution": "Implemented cloud-native architecture, deployed AI-powered analytics, automated workflows with RPA.",
                "impact": "Reduced operational costs by 40%, improved processing speed by 70%, enhanced customer satisfaction scores by 50%.",
                "metrics": [
                    {"value": "40%", "label": "Cost Reduction"},
                    {"value": "70%", "label": "Faster Processing"},
                    {"value": "50%", "label": "Customer Satisfaction"}
                ],
                "image_url": "https://images.unsplash.com/photo-1639094071972-a79473d1a7c6?q=85&w=1080&auto=format&fit=crop",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Manufacturing AI Implementation",
                "client": "Global Manufacturing Corp",
                "industry": "Manufacturing",
                "challenge": "Quality control issues, supply chain inefficiencies, predictive maintenance challenges.",
                "solution": "Deployed computer vision for quality inspection, AI-powered supply chain optimization, IoT-based predictive maintenance.",
                "impact": "Reduced defects by 85%, optimized inventory by 60%, decreased downtime by 45%.",
                "metrics": [
                    {"value": "85%", "label": "Defect Reduction"},
                    {"value": "60%", "label": "Inventory Optimization"},
                    {"value": "45%", "label": "Less Downtime"}
                ],
                "image_url": "https://images.unsplash.com/photo-1645477704075-cb3d14b349ee?q=85&w=1080&auto=format&fit=crop",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Healthcare Data Platform",
                "client": "Major Healthcare Provider",
                "industry": "Healthcare",
                "challenge": "Fragmented patient data, compliance requirements, lack of real-time insights for clinical decisions.",
                "solution": "Built unified data platform, implemented HIPAA-compliant infrastructure, deployed real-time analytics dashboards.",
                "impact": "Unified 10M+ patient records, achieved 100% compliance, reduced diagnosis time by 30%.",
                "metrics": [
                    {"value": "10M+", "label": "Records Unified"},
                    {"value": "100%", "label": "Compliance"},
                    {"value": "30%", "label": "Faster Diagnosis"}
                ],
                "image_url": "https://images.unsplash.com/photo-1642097972624-6ed84e4fe099?q=85&w=1080&auto=format&fit=crop",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.case_studies.insert_many(case_studies)
        print(f"✓ Created {len(case_studies)} case studies")
    else:
        print(f"✓ {case_studies_count} case studies already exist")
    
    # Sample Blog Posts
    blog_count = await db.blog_posts.count_documents({})
    if blog_count == 0:
        blog_posts = [
            {
                "id": str(uuid.uuid4()),
                "title": "The Future of Enterprise AI: Trends to Watch in 2026",
                "slug": "future-enterprise-ai-2026",
                "excerpt": "As AI continues to evolve, enterprises must stay ahead of emerging trends. Explore the key developments shaping the future of business intelligence.",
                "content": """Artificial intelligence is no longer a futuristic concept—it's a critical component of modern enterprise strategy. As we progress through 2026, several key trends are reshaping how organizations leverage AI for competitive advantage.

**1. Generative AI Integration**
Enterprises are moving beyond experimentation to full-scale deployment of generative AI systems. From automated content creation to code generation, these tools are becoming embedded in daily workflows.

**2. AI Governance and Ethics**
With increased adoption comes the need for robust governance frameworks. Organizations are establishing AI ethics committees and implementing transparency measures to ensure responsible AI use.

**3. Edge AI and Real-time Processing**
The shift toward edge computing is enabling real-time AI processing at the source, reducing latency and improving privacy.

**4. AI-Powered Automation**
Intelligent automation is evolving beyond simple rule-based systems to adaptive, learning-based processes that continuously improve.

**5. Democratization of AI**
Low-code and no-code AI platforms are making advanced capabilities accessible to non-technical users, driving innovation across all business functions.

The organizations that successfully navigate these trends will be the ones that view AI not as a standalone technology, but as a fundamental enabler of business transformation.""",
                "author": "Dr. Sarah Chen",
                "category": "Artificial Intelligence",
                "image_url": "https://images.unsplash.com/photo-1645477704075-cb3d14b349ee?q=85&w=1080&auto=format&fit=crop",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Building Data-Driven Organizations: A Strategic Framework",
                "slug": "building-data-driven-organizations",
                "excerpt": "Transform your enterprise into a data-driven powerhouse with our proven strategic framework for data culture and capability development.",
                "content": """Becoming truly data-driven requires more than just technology—it demands organizational transformation. Here's our framework for building data-centric enterprises.

**Foundation: Data Strategy**
Start with a clear data strategy aligned to business objectives. Define what success looks like and establish key metrics.

**Infrastructure: Modern Data Architecture**
Implement cloud-native data platforms that support scalability, real-time processing, and advanced analytics.

**Culture: Data Literacy**
Invest in organization-wide data literacy programs. Everyone should understand how to interpret and use data effectively.

**Governance: Trust and Compliance**
Establish robust data governance to ensure quality, security, and regulatory compliance.

**Analytics: From Descriptive to Prescriptive**
Evolve your analytics capabilities from reporting what happened to predicting what will happen and recommending actions.

**Continuous Improvement**
Data-driven transformation is ongoing. Establish feedback loops and continuously refine your approach.

Success requires commitment from leadership, investment in technology and skills, and patience as the organization adapts to new ways of working.""",
                "author": "Michael Torres",
                "category": "Data Strategy",
                "image_url": "https://images.unsplash.com/photo-1639094071972-a79473d1a7c6?q=85&w=1080&auto=format&fit=crop",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.blog_posts.insert_many(blog_posts)
        print(f"✓ Created {len(blog_posts)} blog posts")
    else:
        print(f"✓ {blog_count} blog posts already exist")
    
    # Sample Career Listings
    careers_count = await db.careers.count_documents({})
    if careers_count == 0:
        careers = [
            {
                "id": str(uuid.uuid4()),
                "title": "Senior AI Engineer",
                "department": "Engineering",
                "location": "San Francisco, CA / Remote",
                "type": "Full-time",
                "description": "We're seeking an experienced AI Engineer to design and implement cutting-edge machine learning systems for enterprise clients.",
                "requirements": [
                    "5+ years experience in machine learning/AI",
                    "Strong Python programming skills",
                    "Experience with TensorFlow, PyTorch, or similar frameworks",
                    "Track record of deploying ML models to production",
                    "Excellent communication skills"
                ],
                "responsibilities": [
                    "Design and develop AI/ML solutions for clients",
                    "Lead technical implementation of ML projects",
                    "Mentor junior engineers",
                    "Collaborate with cross-functional teams",
                    "Stay current with latest AI research and technologies"
                ],
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Cloud Solutions Architect",
                "department": "Engineering",
                "location": "New York, NY / Hybrid",
                "type": "Full-time",
                "description": "Join our team as a Cloud Solutions Architect, designing scalable, secure cloud architectures for global enterprises.",
                "requirements": [
                    "7+ years cloud architecture experience",
                    "Expertise in AWS, Azure, or GCP",
                    "Strong understanding of microservices and containers",
                    "Experience with infrastructure as code",
                    "Cloud certifications preferred"
                ],
                "responsibilities": [
                    "Design enterprise cloud solutions",
                    "Lead cloud migration projects",
                    "Establish best practices and standards",
                    "Provide technical leadership",
                    "Work directly with clients"
                ],
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Data Engineering Lead",
                "department": "Data & Analytics",
                "location": "Austin, TX / Remote",
                "type": "Full-time",
                "description": "Lead our data engineering practice, building robust data pipelines and platforms that power intelligent decision-making.",
                "requirements": [
                    "8+ years data engineering experience",
                    "Expert in SQL and Python",
                    "Experience with modern data stack (Airflow, dbt, Spark)",
                    "Strong leadership and mentoring skills",
                    "Experience with data warehouse design"
                ],
                "responsibilities": [
                    "Lead data engineering team",
                    "Design data architecture and pipelines",
                    "Ensure data quality and governance",
                    "Collaborate with analytics and ML teams",
                    "Drive technical strategy"
                ],
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.careers.insert_many(careers)
        print(f"✓ Created {len(careers)} career listings")
    else:
        print(f"✓ {careers_count} career listings already exist")
    
    print("\nDatabase seeding complete!")
    print("\n" + "="*50)
    print("Admin Login Credentials:")
    print("Email: admin@nexora.systems")
    print("Password: admin123")
    print("="*50)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())
