# 🏨 HotelLux - Complete Local Development Setup

This guide will help you set up the entire HotelLux Management System to run locally on your PC, completely independent of any cloud services.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

## 🚀 Quick Setup (Automated)

### Option 1: Windows Batch Script (Recommended)

1. **Navigate to Backend folder**
   ```cmd
   cd HMS\Backend
   ```

2. **Run setup script**
   ```cmd
   setup.bat
   ```

3. **Start development server**
   ```cmd
   start-dev.bat
   ```

### Option 2: Manual Setup

Follow the detailed steps below if you prefer manual setup or encounter issues with the automated script.

## 🛠️ Manual Setup Instructions

### Step 1: Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd HMS/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Windows
   copy .env.example .env
   
   # The .env file is pre-configured for local development
   # No changes needed unless you want to customize ports
   ```

4. **Initialize database and seed demo data**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # OR Production mode
   npm start
   ```

   The backend will be available at: `http://localhost:3001`

### Step 2: Frontend Setup

1. **Navigate back to main HMS directory**
   ```bash
   cd ..
   ```

2. **Install frontend dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173` (Vite) or `http://localhost:3000` (React)

## 🔐 Demo Login Credentials

The system comes with pre-configured demo accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@hotel.com | admin123 | Full system access |
| **Receptionist** | reception@hotel.com | reception123 | Front desk operations |
| **Housekeeping** | housekeeping@hotel.com | house123 | Cleaning & inventory |
| **Maintenance** | maintenance@hotel.com | maint123 | Work orders & repairs |
| **Guest** | guest@hotel.com | guest123 | Limited guest access |

## 🌐 Local URLs

Once both servers are running:

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001/api/v1`
- **Health Check**: `http://localhost:3001/health`
- **API Documentation**: See Backend/README.md

## 📁 Project Structure

```
HMS/
├── Backend/                 # Local Express.js server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Authentication & validation
│   │   ├── database.js     # SQLite database
│   │   ├── seed.js        # Demo data seeder
│   │   └── server.js      # Main server file
│   ├── data/              # SQLite database files
│   ├── uploads/           # File storage
│   ├── .env              # Environment configuration
│   └── package.json      # Backend dependencies
├── api/                   # Frontend API client
├── components/            # React components
├── contexts/             # React contexts
└── package.json          # Frontend dependencies
```

## 🗄️ Local Database

The system uses **SQLite** for local data storage:

- **Location**: `Backend/data/hotel.db`
- **Type**: File-based SQL database
- **No installation required** - SQLite is embedded

### Database Features
- ✅ User authentication & sessions
- ✅ Room management & status tracking
- ✅ Reservation system
- ✅ Housekeeping task management
- ✅ Maintenance work orders
- ✅ Inventory tracking

## 🔧 Configuration Options

### Backend Configuration (Backend/.env)

```env
# Server Settings
PORT=3001                    # Backend server port
NODE_ENV=development         # Environment mode

# Database
DB_PATH=./data/hotel.db     # SQLite database location

# Authentication
JWT_SECRET=hotellux-local-dev-secret-key-2025
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=hotellux-refresh-token-secret-2025
REFRESH_TOKEN_EXPIRES_IN=7d

# File Uploads
UPLOAD_DIR=./uploads        # File storage directory
MAX_FILE_SIZE=5242880      # 5MB max file size

# CORS (Cross-Origin Resource Sharing)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:3001/api/v1` when running locally.

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# Error: Port 3001 is already in use
# Solution: Kill existing process or change port

# Windows - Find and kill process
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Or change port in Backend/.env
PORT=3002
```

#### 2. Database Issues
```bash
# Error: Database locked or corrupted
# Solution: Reset database

cd Backend
del data\hotel.db          # Delete database file
npm run seed              # Recreate and seed
```

#### 3. CORS Errors
```bash
# Error: Cross-origin request blocked
# Solution: Check allowed origins

# Ensure frontend URL is in Backend/.env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### 4. Module Not Found
```bash
# Error: Cannot find module
# Solution: Reinstall dependencies

# Backend
cd Backend
del node_modules
del package-lock.json
npm install

# Frontend  
cd ..
del node_modules
del package-lock.json
npm install
```

#### 5. Authentication Issues
```bash
# Error: Invalid token or session
# Solution: Clear browser storage and re-login

# In browser console:
localStorage.clear()
# Then refresh page and login again
```

## 🔄 Data Management

### Reset to Demo Data
```bash
cd Backend
npm run seed
```

### Backup Database
```bash
# Copy the database file
copy Backend\data\hotel.db Backend\data\hotel_backup.db
```

### View Database (Optional)
You can use any SQLite browser tool like:
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Free)
- [SQLite Studio](https://sqlitestudio.pl/) (Free)

## 📊 System Features

### ✅ Fully Functional Modules
- **Dashboard** - Real-time KPIs and analytics
- **Room Management** - Status tracking and occupancy
- **Reservations** - Booking management system
- **Front Desk** - Check-in/out operations
- **Housekeeping** - Task and inventory management
- **Maintenance** - Work order system
- **User Management** - Role-based access control
- **Authentication** - Secure login system

### ✅ Local Replacements
- **Supabase → SQLite** - Cloud database → Local file database
- **Supabase Auth → JWT** - Cloud auth → Local JWT tokens
- **Supabase Storage → Local Files** - Cloud storage → Local file system
- **Supabase Functions → Express Routes** - Serverless → Local API server

## 🎯 Development Workflow

1. **Start Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Start Frontend Server** (in new terminal)
   ```bash
   cd HMS
   npm run dev
   ```

3. **Access Application**
   - Open `http://localhost:5173` in browser
   - Login with demo credentials
   - Start developing!

## 📝 API Testing

You can test the API directly using:

### Browser
- Health check: `http://localhost:3001/health`

### curl (Command Line)
```bash
# Health check
curl http://localhost:3001/health

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@hotel.com\",\"password\":\"admin123\"}"
```

### Postman/Insomnia
Import the API endpoints from Backend/README.md

## 🔒 Security Notes

- All passwords are hashed with bcrypt (cost factor 12)
- JWT tokens expire after 24 hours
- Refresh tokens expire after 7 days
- Role-based access control on all endpoints
- CORS protection enabled
- Input validation on all API endpoints

## 🚀 Production Deployment

This local setup is designed for development. For production:

1. **Change environment variables**
   - Use strong, unique JWT secrets
   - Set NODE_ENV=production
   - Configure proper CORS origins

2. **Database considerations**
   - SQLite is fine for small-scale production
   - Consider PostgreSQL/MySQL for larger scale

3. **File storage**
   - Local files work for single-server deployment
   - Consider cloud storage for multi-server setup

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure ports 3001 and 5173 are available
4. Check console logs for error messages

---

**🎉 Congratulations!** You now have a fully functional, local hotel management system running entirely on your PC with no external dependencies!