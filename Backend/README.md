# HotelLux Backend - Local Development Setup

A complete local backend for the HotelLux Management System using Express.js, SQLite, and JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Setup Environment**
   ```bash
   # Copy environment template
   copy .env.example .env
   
   # Edit .env file if needed (optional)
   ```

3. **Initialize Database & Seed Data**
   ```bash
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## 📋 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hotel.com | admin123 |
| Receptionist | reception@hotel.com | reception123 |
| Housekeeping | housekeeping@hotel.com | house123 |
| Maintenance | maintenance@hotel.com | maint123 |
| Guest | guest@hotel.com | guest123 |

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Initialize database and seed demo data
- `npm run setup` - Install dependencies and seed database

## 📡 API Endpoints

### Base URL: `http://localhost:3001/api/v1`

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token
- `GET /auth/me` - Get current user

### Rooms
- `GET /rooms` - List all rooms (with filters)
- `GET /rooms/:id` - Get room details
- `PUT /rooms/:id/status` - Update room status
- `GET /rooms/statistics` - Get room statistics

### Reservations
- `GET /reservations` - List reservations
- `POST /reservations` - Create reservation
- `PUT /reservations/:id` - Update reservation
- `DELETE /reservations/:id` - Cancel reservation

### Housekeeping
- `GET /housekeeping/tasks` - List tasks
- `POST /housekeeping/tasks` - Create task
- `PUT /housekeeping/tasks/:id` - Update task
- `GET /housekeeping/inventory` - Get inventory
- `PUT /housekeeping/inventory/:id` - Update inventory

### Maintenance
- `GET /maintenance/work-orders` - List work orders
- `POST /maintenance/work-orders` - Create work order
- `PUT /maintenance/work-orders/:id` - Update work order
- `DELETE /maintenance/work-orders/:id` - Delete work order

## 🗄️ Database

Uses SQLite database stored in `./data/hotel.db`

### Tables
- `users` - User accounts and authentication
- `rooms` - Hotel room information
- `reservations` - Booking reservations
- `housekeeping_tasks` - Cleaning and maintenance tasks
- `inventory` - Housekeeping inventory items
- `work_orders` - Maintenance work orders
- `sessions` - JWT session management

## 🔐 Authentication

- JWT tokens with 24-hour expiration
- Refresh tokens with 7-day expiration
- Role-based access control (RBAC)
- Secure password hashing with bcrypt

## 🌐 CORS Configuration

Configured to allow requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)

## 📁 Project Structure

```
Backend/
├── src/
│   ├── routes/          # API route handlers
│   │   ├── auth.js      # Authentication routes
│   │   ├── rooms.js     # Room management
│   │   ├── reservations.js
│   │   ├── housekeeping.js
│   │   └── maintenance.js
│   ├── middleware/      # Express middleware
│   │   └── auth.js      # JWT authentication
│   ├── database.js      # SQLite database wrapper
│   ├── seed.js         # Database seeder
│   └── server.js       # Main Express server
├── data/               # SQLite database files
├── uploads/            # File upload storage
├── .env               # Environment variables
└── package.json       # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_PATH=./data/hotel.db

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 3001 already in use**
   ```bash
   # Change PORT in .env file or kill existing process
   netstat -ano | findstr :3001
   taskkill /PID <PID> /F
   ```

2. **Database locked error**
   ```bash
   # Delete database and reseed
   del data\hotel.db
   npm run seed
   ```

3. **CORS errors**
   - Ensure frontend is running on allowed origins
   - Check ALLOWED_ORIGINS in .env file

### Health Check

Visit `http://localhost:3001/health` to verify server is running.

## 📝 Development Notes

- Database is automatically created on first run
- All passwords are hashed with bcrypt (cost factor 12)
- JWT tokens are stored in database sessions table
- File uploads are stored in `./uploads` directory
- API responses follow consistent format with `success` and `data/error` fields

## 🔄 Data Reset

To reset all data to demo state:
```bash
npm run seed
```

This will clear all existing data and reload demo accounts, rooms, and sample reservations.