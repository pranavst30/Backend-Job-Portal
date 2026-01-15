# Quick Start Guide - Job Portal Backend

Get your Job Portal Backend up and running in **5 minutes**!

---

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** database - [MongoDB Atlas (Free)](https://www.mongodb.com/cloud/atlas) or local installation
- **Git** (optional but recommended)

---

## Step 1: Get the Code

### Option A: Clone from GitHub
```bash
git clone https://github.com/pranavst30/Backend-Job-Portal.git
cd Job-Portal-Backend
```

### Option B: Download ZIP
1. Download the project as ZIP
2. Extract to your desired location
3. Open terminal in that folder

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~30 seconds).

---

## Step 3: Configure Environment

1. **Copy the example environment file:**
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

2. **Edit `.env` file** with your favorite text editor:
   ```env
   PORT=8080
   DEV_MODE=development
   MONGO_URL=your_mongodb_connection_string_here
   JWT_KEY=your_secret_key_here
   ```

3. **Get MongoDB Connection String:**
   
   **Using MongoDB Atlas (Recommended):**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a cluster (Free M0 tier)
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Paste into `MONGO_URL` in `.env`

   **Using Local MongoDB:**
   ```env
   MONGO_URL=mongodb://localhost:27017/jobportal
   ```

4. **Generate JWT Secret:**
   ```bash
   # Run this in terminal to generate a secure key
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copy the output and paste into `JWT_KEY` in `.env`

---

## Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run server

# OR production mode
npm start
```

You should see:
```
Database Connected at <your-cluster>
listening to port 8080 on development mode
```

---

## Step 5: Test the API

### Option A: Use Swagger UI (Easiest)
1. Open browser: **http://localhost:8080/api-docs**
2. Try the "Register" endpoint
3. Click "Try it out"
4. Fill in the example data
5. Click "Execute"

### Option B: Use cURL (Command Line)
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\",\"location\":\"India\"}"
```

### Option C: Use Postman/Thunder Client
1. Create new POST request
2. URL: `http://localhost:8080/api/v1/auth/register`
3. Body (JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "test123",
     "location": "India"
   }
   ```
4. Send!

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "location": "India",
    "isEmployer": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Success! What's Next?

### Explore the API
- **Full API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Interactive Docs:** http://localhost:8080/api-docs

### Try These Endpoints

1. **Login:**
   ```bash
   POST /api/v1/auth/login
   ```

2. **Create a Job (as employer):**
   ```bash
   POST /api/v1/job/create
   # Don't forget: Set isEmployer=true when registering!
   ```

3. **View All Jobs:**
   ```bash
   GET /api/v1/job/all
   ```

4. **Apply for a Job:**
   ```bash
   POST /api/v1/application/apply/:jobId
   ```

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check your `MONGO_URL` in `.env`
- Ensure MongoDB is running (if using local)
- Check IP whitelist in MongoDB Atlas (add `0.0.0.0/0` for testing)

### Issue: "Port already in use"
**Solution:**
- Change `PORT` in `.env` to another number (e.g., 3000, 5000)
- Or kill the process using port 8080:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:8080 | xargs kill
  ```

### Issue: "JWT_KEY is not defined"
**Solution:**
- Make sure `.env` file exists in root directory
- Ensure `JWT_KEY` is set in `.env`
- Restart the server after editing `.env`

### Issue: Dependencies won't install
**Solution:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you have internet connection
- Try `npm cache clean --force` then `npm install`

---

## Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Complete project overview |
| `API_DOCUMENTATION.md` | Detailed API reference |
| `DEPLOYMENT.md` | How to deploy to production |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Version history |
| `.env.example` | Environment variables template |

---

## Important Security Notes

For **development**:
- Current setup is fine
- Use simple JWT_KEY for testing

For **production**:
- Use strong, random JWT_KEY
- Don't commit `.env` file to Git
- Enable CORS only for your frontend domain
- Use HTTPS
- Set up proper MongoDB authentication

---

## Deploy to Production

Ready to deploy? Check out our [Deployment Guide](./DEPLOYMENT.md) for:
- Vercel (1-click deploy)
- Heroku
- Railway
- VPS setup
- MongoDB Atlas configuration

---

## Pro Tips

1. **Use nodemon for development:**
   ```bash
   npm run server  # Auto-reloads on file changes
   ```

2. **Check API logs:**
   - Morgan logs every request in the console
   - Look for HTTP method, endpoint, status code, and response time

3. **Swagger is your friend:**
   - Interactive documentation at `/api-docs`
   - Test all endpoints directly from browser
   - See request/response examples

4. **Postman Collection:**
   - Export Swagger docs as Postman collection
   - Save time with pre-configured requests

---

## Need Help?

- Read the full [README.md](./README.md)
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Open an issue on GitHub
- Ask in discussions

---

**Happy Coding!**

Built with care by Pranav Tavarej
