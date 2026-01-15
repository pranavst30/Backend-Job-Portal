# Job Portal Backend API

A comprehensive RESTful API for a job portal application built with Node.js, Express, and MongoDB. This backend supports user authentication, job posting management, and application tracking for both job seekers and employers.

**Author:** Pranav Tavarej  
**Version:** 1.0.0  
**Repository:** [https://github.com/pranavst30/Job-Portal-Backend](https://github.com/pranavst30/Job-Portal-Backend)

---

## Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Token-based session management (3-day expiry)
- Rate limiting on authentication endpoints (100 requests per 15 minutes)

### User Management
- User profile creation and updates
- Role-based access (Job Seekers & Employers)
- User data retrieval and deletion
- Location-based user profiles

### Job Management
- Job posting creation (Employers only)
- Job listing with filtering options
- Job updates and deletion (Employers only)
- Job statistics and analytics
- Support for multiple work types (full-time, part-time, internship)
- Job status management (open/close)

### Application Management
- Job application submission
- Resume upload support
- Application tracking
- Duplicate application prevention
- Application deletion

### Security Features
- Helmet.js for secure HTTP headers
- XSS protection
- MongoDB sanitization to prevent NoSQL injection
- CORS configuration
- Input validation
- Rate limiting

### API Documentation
- Interactive Swagger/OpenAPI documentation
- Available at `/api-docs` endpoint

---

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Validator.js
- **Security:** Helmet, XSS-Clean, Express-Mongo-Sanitize
- **File Upload:** Multer
- **Documentation:** Swagger UI, Swagger JSDoc
- **Logging:** Morgan
- **Environment:** dotenv

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavst30/Job-Portal-Backend.git
   cd Job-Portal-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8080
   DEV_MODE=development
   
   # Database
   MONGO_URL=your_mongodb_connection_string
   
   # JWT Secret
   JWT_KEY=your_secret_key_here
   ```

4. **Start the server**
   
   Development mode (with nodemon):
   ```bash
   npm run server
   ```
   
   Production mode:
   ```bash
   npm start
   ```

5. **Access the API**
   - API Base URL: `http://localhost:8080`
   - API Documentation: `http://localhost:8080/api-docs`

---

## API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user | No |

### User Management (`/api/v1/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/update-user` | Update user profile | Yes |
| GET | `/all` | Get all users | No |
| GET | `/:id` | Get user by ID | No |
| DELETE | `/delete-user` | Delete user account | Yes |
| POST | `/get-user` | Get authenticated user data | Yes |

### Job Management (`/api/v1/job`)

| Method | Endpoint | Description | Auth Required | Employer Only |
|--------|----------|-------------|---------------|---------------|
| POST | `/create` | Create a new job | Yes | Yes |
| PUT | `/update-job/:id` | Update a job | Yes | Yes |
| DELETE | `/delete-job/:id` | Delete a job | Yes | Yes |
| GET | `/all` | Get all jobs | No | No |
| GET | `/:id` | Get job by ID | No | No |
| GET | `/job-stats` | Get job statistics | Yes | No |

### Application Management (`/api/v1/application`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/apply/:jobId` | Apply for a job | Yes |
| DELETE | `/delete/:id` | Delete application | Yes |
| GET | `/all` | Get user's applications | Yes |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. Register a new user or login
2. Copy the token from the response
3. Use it in subsequent requests

**Example Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "location": "India",
    "isEmployer": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Request/Response Examples

### Register User

**Request:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "location": "Mumbai",
  "isEmployer": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Mumbai",
    "isEmployer": false
  }
}
```

### Create Job (Employers Only)

**Request:**
```http
POST /api/v1/job/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Tech Corp",
  "position": "Full Stack Developer",
  "desc": "We are looking for an experienced developer...",
  "workType": "full-time",
  "workLocation": "Bangalore",
  "status": "open"
}
```

### Apply for Job

**Request:**
```http
POST /api/v1/application/apply/64f7e8c9d1234567890abcde
Authorization: Bearer <token>
```

---

## Project Structure

```
Job_portal_backend_project-main/
├── config/
│   └── db.js                    # Database connection configuration
├── controller/
│   ├── authController.js        # Authentication logic
│   ├── userController.js        # User CRUD operations
│   ├── jobController.js         # Job CRUD operations
│   └── applicationController.js # Application management
├── middlewares/
│   ├── authMiddleware.js        # JWT verification & role checks
│   ├── errorMiddleware.js       # Global error handler
│   └── upload.js                # File upload configuration
├── models/
│   ├── userModel.js             # User schema
│   ├── jobsModel.js             # Job schema
│   └── applicationModel.js      # Application schema
├── route/
│   ├── authRoutes.js            # Authentication routes
│   ├── userRoutes.js            # User routes
│   ├── jobRoutes.js             # Job routes
│   └── applicationRoutes.js     # Application routes
├── uploads/                      # Uploaded files directory
├── .env                          # Environment variables (create this)
├── .gitignore                    # Git ignore file
├── index.js                      # Application entry point
├── package.json                  # Project dependencies
├── vercel.json                   # Vercel deployment config
└── README.md                     # Project documentation
```

---

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with `vercel.json`.

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add environment variables** in Vercel dashboard:
   - `MONGO_URL`
   - `JWT_KEY`
   - `PORT`
   - `DEV_MODE`

### Alternative Deployment Options

- **Heroku:** Use the Heroku CLI and configure environment variables
- **Railway:** Connect your GitHub repository
- **Render:** Configure build and start commands
- **AWS/DigitalOcean:** Use PM2 for process management

---

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No (defaults to 8080) | `8080` |
| `DEV_MODE` | Environment mode | Yes | `development` or `production` |
| `MONGO_URL` | MongoDB connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/jobportal` |
| `JWT_KEY` | Secret key for JWT | Yes | `your_super_secret_key_here` |

---

## Testing the API

### Using Swagger UI
1. Start the server
2. Navigate to `http://localhost:8080/api-docs`
3. Try out endpoints directly from the interface

### Using Postman/Thunder Client
1. Import the API collection (can be generated from Swagger)
2. Set up environment variables
3. Test endpoints

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "location": "India"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

**Pranav Tavarej**

---

## Support

For support, please open an issue in the repository or contact the author.

---

## Version History

- **v1.0.0** - Initial release with core features
  - User authentication
  - Job management
  - Application tracking
  - API documentation

---

## Important Notes

1. **Never commit the `.env` file** - It contains sensitive credentials
2. **Change the JWT_KEY** in production to a strong, random string
3. **Configure CORS properly** for production use (currently commented in index.js)
4. **Set up MongoDB indexes** for better performance in production
5. **Enable HTTPS** in production environments

---

Made with care by Pranav Tavarej
