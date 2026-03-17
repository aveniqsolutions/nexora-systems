import requests
import sys
import json
from datetime import datetime

class NexoraAPITester:
    def __init__(self):
        self.base_url = "https://nexora-transform.preview.emergentagent.com/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, name, status, details=""):
        """Log test result"""
        result = {
            "test": name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status_emoji = "✅" if status == "PASS" else "❌"
        print(f"{status_emoji} {name}: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                self.log_result(name, "PASS", f"Status: {response.status_code}")
                try:
                    return True, response.json()
                except:
                    return True, {"message": "Success"}
            else:
                self.log_result(name, "FAIL", f"Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            self.log_result(name, "FAIL", f"Error: {str(e)}")
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test("Root Endpoint", "GET", "", 200)
        return success

    def test_admin_login(self):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"email": "admin@nexora.systems", "password": "admin123"}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"✅ Token received: {self.token[:20]}...")
            return True
        return False

    def test_verify_auth(self):
        """Test auth verification"""
        success, _ = self.run_test("Auth Verification", "GET", "auth/verify", 200)
        return success

    def test_case_studies(self):
        """Test case studies endpoints"""
        # Get case studies
        success, response = self.run_test("Get Case Studies", "GET", "case-studies", 200)
        if success and len(response) >= 3:
            print(f"✅ Found {len(response)} case studies")
            
            # Test individual case study
            if response:
                study_id = response[0]['id']
                success, _ = self.run_test(
                    "Get Case Study Detail", 
                    "GET", 
                    f"case-studies/{study_id}", 
                    200
                )
                return success
            return True
        else:
            print(f"❌ Expected at least 3 case studies, got {len(response) if response else 0}")
            return False

    def test_blog_posts(self):
        """Test blog endpoints"""
        # Get blog posts
        success, response = self.run_test("Get Blog Posts", "GET", "blog", 200)
        if success and len(response) >= 2:
            print(f"✅ Found {len(response)} blog posts")
            
            # Test individual blog post
            if response:
                slug = response[0]['slug']
                success, _ = self.run_test(
                    "Get Blog Post Detail", 
                    "GET", 
                    f"blog/{slug}", 
                    200
                )
                return success
            return True
        else:
            print(f"❌ Expected at least 2 blog posts, got {len(response) if response else 0}")
            return False

    def test_careers(self):
        """Test careers endpoints"""
        success, response = self.run_test("Get Careers", "GET", "careers", 200)
        if success and len(response) >= 3:
            print(f"✅ Found {len(response)} career listings")
            
            # Test individual career
            if response:
                career_id = response[0]['id']
                success, _ = self.run_test(
                    "Get Career Detail", 
                    "GET", 
                    f"careers/{career_id}", 
                    200
                )
                return success
            return True
        else:
            print(f"❌ Expected at least 3 career listings, got {len(response) if response else 0}")
            return False

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "message": "This is a test contact form submission."
        }
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        return success

    def test_demo_request(self):
        """Test demo request submission"""
        demo_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Corp",
            "role": "CTO",
            "phone": "+1234567890",
            "employees": "51-200",
            "services_interested": ["AI Strategy & Implementation", "Data Engineering & Analytics"],
            "timeline": "1-3 months",
            "message": "Interested in AI transformation"
        }
        success, response = self.run_test(
            "Demo Request Submission",
            "POST",
            "demo-request",
            200,
            data=demo_data
        )
        return success

    def test_dashboard_stats(self):
        """Test dashboard stats (requires auth)"""
        success, response = self.run_test("Dashboard Stats", "GET", "dashboard/stats", 200)
        if success:
            expected_keys = ['case_studies', 'blog_posts', 'pending_contacts', 'pending_demos', 'active_jobs']
            if all(key in response for key in expected_keys):
                print(f"✅ Dashboard stats complete: {response}")
                return True
            else:
                print(f"❌ Missing dashboard stat keys: {response}")
                return False
        return False

    def test_get_contact_submissions(self):
        """Test getting contact submissions (admin only)"""
        success, response = self.run_test("Get Contact Submissions", "GET", "contact", 200)
        if success:
            print(f"✅ Found {len(response)} contact submissions")
        return success

    def test_get_demo_requests(self):
        """Test getting demo requests (admin only)"""
        success, response = self.run_test("Get Demo Requests", "GET", "demo-request", 200)
        if success:
            print(f"✅ Found {len(response)} demo requests")
        return success

def main():
    print("🚀 Starting Nexora Systems API Testing...")
    print("=" * 50)
    
    tester = NexoraAPITester()
    
    # Test public endpoints first
    print("\n📋 TESTING PUBLIC ENDPOINTS")
    print("-" * 30)
    
    # Basic connectivity
    if not tester.test_root_endpoint():
        print("❌ Root endpoint failed, stopping tests")
        return 1
    
    # Test public content endpoints
    tester.test_case_studies()
    tester.test_blog_posts()  
    tester.test_careers()
    
    # Test form submissions
    tester.test_contact_form()
    tester.test_demo_request()
    
    # Test authentication and admin endpoints
    print("\n🔐 TESTING AUTHENTICATION & ADMIN ENDPOINTS")
    print("-" * 30)
    
    if not tester.test_admin_login():
        print("❌ Admin login failed, skipping auth tests")
    else:
        tester.test_verify_auth()
        tester.test_dashboard_stats()
        tester.test_get_contact_submissions()
        tester.test_get_demo_requests()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 TEST RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Save detailed results
    with open('/app/test_reports/backend_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%"
            },
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())