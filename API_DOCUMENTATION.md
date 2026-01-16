# API Documentation - Job Portal Backend

**Base URL:** `http://localhost:8080`  
**API Version:** v1  
**Authentication:** JWT Bearer Token

---

## Table of Contents
1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Job Management](#job-management)
4. [Application Management](#application-management)
5. [Error Codes](#error-codes)
6. [Rate Limiting](#rate-limiting)

---

## Authentication

### Register New User
Create a new user account (job seeker or employer).

**Endpoint:** `POST /api/v1/auth/register`  
**Auth Required:** No  
**Rate Limited:** Yes (100 req/15 min)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "location": "Mumbai",
  "isEmployer": false
}
```

**Validation Rules:**
- `name`: Required, string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters
- `location`: Optional, string (default: "India")
- `isEmployer`: Optional, boolean (default: false)

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Mumbai",
    "isEmployer": false,
    "createdAt": "2026-01-15T14:20:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /api/v1/auth/login`  
**Auth Required:** No  
**Rate Limited:** Yes (100 req/15 min)

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Mumbai",
    "isEmployer": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Expiry:** 3 days

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## User Management

### Update User Profile
Update the authenticated user's profile information.

**Endpoint:** `PUT /api/v1/user/update-user`  
**Auth Required:** Yes  
**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "location": "Delhi"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "name": "John Updated",
    "email": "john.new@example.com",
    "location": "Delhi",
    "isEmployer": false
  }
}
```

---

### Get All Users
Retrieve a list of all registered users.

**Endpoint:** `GET /api/v1/user/all`  
**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "totalUsers": 25,
  "users": [
    {
      "_id": "64f7e8c9d1234567890abcde",
      "name": "John Doe",
      "email": "john@example.com",
      "location": "Mumbai",
      "isEmployer": false,
      "createdAt": "2026-01-15T14:20:00.000Z"
    }
  ]
}
```

---

### Get User by ID
Retrieve a specific user's information.

**Endpoint:** `GET /api/v1/user/:id`  
**Auth Required:** No

**URL Parameters:**
- `id` - User's MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f7e8c9d1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Mumbai",
    "isEmployer": false
  }
}
```

---

### Get Authenticated User Data
Get the current logged-in user's information.

**Endpoint:** `POST /api/v1/user/get-user`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f7e8c9d1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Mumbai",
    "isEmployer": false
  }
}
```

---

### Delete User Account
Delete the authenticated user's account.

**Endpoint:** `DELETE /api/v1/user/delete-user`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Job Management

### Create Job Posting
Create a new job posting (employers only).

**Endpoint:** `POST /api/v1/job/create`  
**Auth Required:** Yes (Employer role required)  
**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "company": "Tech Corp",
  "position": "Full Stack Developer",
  "desc": "We are looking for an experienced full stack developer...",
  "workType": "full-time",
  "workLocation": "Bangalore",
  "status": "open"
}
```

**Field Details:**
- `company`: Required, string
- `position`: Required, string
- `desc`: Required, string (job description)
- `workType`: Optional, enum: ["full-time", "part-time", "internship"] (default: "full-time")
- `workLocation`: Optional, string (default: "india")
- `status`: Optional, enum: ["open", "close"] (default: "open")

**Success Response (201):**
```json
{
  "success": true,
  "message": "Job created successfully",
  "job": {
    "_id": "64f7e8c9d1234567890abcde",
    "company": "Tech Corp",
    "position": "Full Stack Developer",
    "desc": "We are looking for an experienced full stack developer...",
    "workType": "full-time",
    "workLocation": "Bangalore",
    "status": "open",
    "employer": "64f7e8c9d1234567890abcdf",
    "createdAt": "2026-01-15T14:25:00.000Z"
  }
}
```

---

### Get All Jobs
Retrieve all job postings with optional filtering.

**Endpoint:** `GET /api/v1/job/all`  
**Auth Required:** No

**Query Parameters (Optional):**
- `status` - Filter by job status (open/close)
- `workType` - Filter by work type (full-time/part-time/internship)
- `search` - Search in company name or position
- `sort` - Sort order (latest/oldest)

**Example:**
```
GET /api/v1/job/all?status=open&workType=full-time&sort=latest
```

**Success Response (200):**
```json
{
  "success": true,
  "totalJobs": 15,
  "jobs": [
    {
      "_id": "64f7e8c9d1234567890abcde",
      "company": "Tech Corp",
      "position": "Full Stack Developer",
      "desc": "Job description...",
      "workType": "full-time",
      "workLocation": "Bangalore",
      "status": "open",
      "employer": {
        "_id": "64f7e8c9d1234567890abcdf",
        "name": "Employer Name"
      },
      "createdAt": "2026-01-15T14:25:00.000Z"
    }
  ]
}
```

---

### Get Job by ID
Retrieve details of a specific job posting.

**Endpoint:** `GET /api/v1/job/:id`  
**Auth Required:** No

**URL Parameters:**
- `id` - Job's MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "job": {
    "_id": "64f7e8c9d1234567890abcde",
    "company": "Tech Corp",
    "position": "Full Stack Developer",
    "desc": "Detailed job description...",
    "workType": "full-time",
    "workLocation": "Bangalore",
    "status": "open",
    "employer": {
      "_id": "64f7e8c9d1234567890abcdf",
      "name": "Employer Name",
      "email": "employer@techcorp.com"
    },
    "createdAt": "2026-01-15T14:25:00.000Z"
  }
}
```

---

### Update Job Posting
Update an existing job posting (employer only, must own the job).

**Endpoint:** `PUT /api/v1/job/update-job/:id`  
**Auth Required:** Yes (Employer role required, must be job owner)

**URL Parameters:**
- `id` - Job's MongoDB ObjectId

**Request Body:**
```json
{
  "position": "Senior Full Stack Developer",
  "desc": "Updated job description...",
  "status": "close"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Job updated successfully",
  "job": {
    "_id": "64f7e8c9d1234567890abcde",
    "company": "Tech Corp",
    "position": "Senior Full Stack Developer",
    "desc": "Updated job description...",
    "status": "close"
  }
}
```

---

### Delete Job Posting
Delete a job posting (employer only, must own the job).

**Endpoint:** `DELETE /api/v1/job/delete-job/:id`  
**Auth Required:** Yes (Employer role required, must be job owner)

**URL Parameters:**
- `id` - Job's MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

### Get Job Statistics
Get statistics about jobs posted by the authenticated employer.

**Endpoint:** `GET /api/v1/job/job-stats`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalJobs": 12,
    "openJobs": 8,
    "closedJobs": 4,
    "statsByWorkType": {
      "full-time": 7,
      "part-time": 3,
      "internship": 2
    },
    "monthlyStats": [
      {
        "month": "January",
        "count": 5
      }
    ]
  }
}
```

---

## Application Management

### Apply for Job
Submit an application for a job posting.

**Endpoint:** `POST /api/v1/application/apply/:jobId`  
**Auth Required:** Yes (Job seekers only)

**URL Parameters:**
- `jobId` - Job's MongoDB ObjectId

**Request Body:**
```json
{
  "resume": "path/to/resume.pdf"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "_id": "64f7e8c9d1234567890abcde",
    "userId": "64f7e8c9d1234567890abcdf",
    "jobId": "64f7e8c9d1234567890abce0",
    "status": "applied",
    "createdAt": "2026-01-15T14:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "You have already applied for this job"
}
```

---

### Get My Applications
Retrieve all applications submitted by the authenticated user.

**Endpoint:** `GET /api/v1/application/all`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "totalApplications": 5,
  "applications": [
    {
      "_id": "64f7e8c9d1234567890abcde",
      "status": "applied",
      "createdAt": "2026-01-15T14:30:00.000Z",
      "job": {
        "_id": "64f7e8c9d1234567890abce0",
        "company": "Tech Corp",
        "position": "Full Stack Developer",
        "workLocation": "Bangalore"
      }
    }
  ]
}
```

---

### Delete Application
Withdraw/delete a job application.

**Endpoint:** `DELETE /api/v1/application/delete/:id`  
**Auth Required:** Yes (Must be application owner)

**URL Parameters:**
- `id` - Application's MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Authentication endpoints (`/api/v1/auth/*`) are rate-limited to:
- **100 requests per 15 minutes** per IP address

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

Rate limit headers are included in responses:
```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1642252800
```

---

## Authentication Flow

1. **Register** or **Login** to receive JWT token
2. **Store token** securely (localStorage/sessionStorage)
3. **Include token** in Authorization header for protected endpoints:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **Token expires** after 3 days - user must login again

---

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- XSS protection
- NoSQL injection prevention
- HTTP security headers (Helmet)
- Rate limiting on sensitive endpoints
- CORS configuration
- Input validation

---

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** - never in plain text
3. **Implement token refresh** for better UX
4. **Handle errors gracefully** on the client side
5. **Validate all inputs** before sending requests
6. **Log out users** by removing stored tokens
7. **Use environment variables** for sensitive data

---

