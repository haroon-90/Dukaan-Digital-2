# Dukaan Digital - Backend

A robust RESTful API server built with Node.js and Express.js, providing backend services for the Dukaan Digital application. This server handles authentication, data management, and business logic for inventory management, sales tracking, expense monitoring, and customer credit management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Security](#security)
- [Deployment](#deployment)
- [Error Handling](#error-handling)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Overview

Dukaan Digital Backend is a Node.js-based RESTful API that powers the Dukaan Digital application. It provides secure authentication, data persistence using MongoDB, and comprehensive business management endpoints for retail operations.

## Features

### Core Functionality

- **User Authentication & Authorization**
  - JWT-based authentication system
  - Bcrypt password hashing
  - Token-based session management
  - Role-based access control (Admin, User)
  - Secure password reset via email

- **Product Management API**
  - CRUD operations for products
  - Inventory tracking
  - Product search and filtering
  - Stock level monitoring
  - Bulk product operations

- **Sales Management API**
  - Record and track sales transactions
  - Invoice generation
  - Sales history and analytics
  - Revenue tracking
  - Date-based sales reports

- **Purchase Management API**
  - Purchase order management
  - Supplier transaction tracking
  - Purchase history
  - Stock replenishment records

- **Expense Tracking API**
  - Business expense recording
  - Expense categorization
  - Expense history and reports
  - Monthly expense analytics

- **Udhaar (Credit) Management API**
  - Customer credit account management
  - Credit transaction logging
  - Payment tracking
  - Outstanding balance calculation
  - Customer-wise credit reports

- **Dashboard Analytics API**
  - Aggregated business metrics
  - Real-time statistics
  - Sales trends
  - Inventory insights
  - Revenue and profit analytics

- **Report Generation API**
  - Comprehensive business reports
  - Profit and loss calculations
  - Inventory reports
  - Sales analytics
  - Custom date range reports

- **Profile Management API**
  - User profile CRUD operations
  - Business information management
  - Account settings

- **Admin Operations API**
  - User management
  - System-wide analytics
  - User status control
  - Administrative oversight

### Additional Features

- **CORS Configuration**
  - Secure cross-origin resource sharing
  - Multiple origin support
  - Credential handling

- **Error Handling**
  - Centralized error handling
  - Detailed error responses
  - Request validation

- **Database Management**
  - MongoDB with Mongoose ODM
  - Data validation
  - Relationship management
  - Efficient querying

## Technology Stack

### Core Technologies

- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Fast, minimalist web framework
- **MongoDB 6.19.0**: NoSQL database
- **Mongoose 8.17.0**: MongoDB object modeling tool

### Authentication & Security

- **jsonwebtoken 9.0.2**: JWT implementation
- **bcrypt 6.0.0**: Password hashing library
- **dotenv 17.2.1**: Environment variable management

### Utilities

- **cors 2.8.5**: Cross-Origin Resource Sharing middleware
- **uuid 11.1.0**: Unique identifier generation
- **serverless-http 4.0.0**: Serverless deployment adapter

## Prerequisites

Before running this project, ensure you have:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **MongoDB**: Local instance or MongoDB Atlas account
- **Git**: For version control

## Installation

1. Clone the repository:

```bash
git clone https://github.com/haroon-90/Dukaan-Digital.git
cd Dukaan-Digital/Backend
```

2. Install dependencies:

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/dukaan-digital
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dukaan-digital

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,https://haroon-90.github.io,https://dukaan-digital.vercel.app

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@dukaandigital.com
ADMIN_PASSWORD=your_admin_password
```

### Security Notes

- Never commit the `.env` file to version control
- Use strong, unique values for `JWT_SECRET`
- For Gmail, use App Passwords instead of regular passwords
- Rotate secrets regularly in production

## Running the Application

### Development Mode

Start the server with auto-reload on file changes:

```bash
npm run dev
```

The server will be available at `http://localhost:5000`

### Production Mode

```bash
node server.js
```

### Database Seeding

To populate the database with initial data:

```bash
node seed.js
```

This will create sample products, categories, and admin user.

## API Documentation

### Base URL

- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://dukaan-digital-backend.vercel.app/api`

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "shopName": "John's Store"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}
```

### Product Endpoints

```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (auth required)
PUT    /api/products/:id      # Update product (auth required)
DELETE /api/products/:id      # Delete product (auth required)
```

### Purchase Endpoints

```
GET    /api/purchases         # Get all purchases
GET    /api/purchases/:id     # Get single purchase
POST   /api/purchases         # Create purchase (auth required)
PUT    /api/purchases/:id     # Update purchase (auth required)
DELETE /api/purchases/:id     # Delete purchase (auth required)
```

### Expense Endpoints

```
GET    /api/expenses          # Get all expenses
GET    /api/expenses/:id      # Get single expense
POST   /api/expenses          # Create expense (auth required)
PUT    /api/expenses/:id      # Update expense (auth required)
DELETE /api/expenses/:id      # Delete expense (auth required)
```

### Udhaar (Credit) Endpoints

```
GET    /api/udhaar            # Get all udhaar records
GET    /api/udhaar/:id        # Get single udhaar record
POST   /api/udhaar            # Create udhaar (auth required)
PUT    /api/udhaar/:id        # Update udhaar (auth required)
DELETE /api/udhaar/:id        # Delete udhaar (auth required)
```

### Sales Endpoints

```
GET    /api/sales             # Get all sales
GET    /api/sales/:id         # Get single sale
POST   /api/sales             # Create sale (auth required)
PUT    /api/sales/:id         # Update sale (auth required)
DELETE /api/sales/:id         # Delete sale (auth required)
```

### Dashboard Endpoints

```
GET    /api/dashboard         # Get dashboard statistics (auth required)
```

### Report Endpoints

```
GET    /api/reports           # Get comprehensive reports (auth required)
GET    /api/reports/sales     # Get sales reports (auth required)
GET    /api/reports/expenses  # Get expense reports (auth required)
```

### Profile Endpoints

```
GET    /api/profile           # Get user profile (auth required)
PUT    /api/profile           # Update profile (auth required)
DELETE /api/profile           # Delete profile (auth required)
```

### Admin Endpoints

```
GET    /api/admin/users       # Get all users (admin only)
GET    /api/admin/dashboard   # Get admin dashboard (admin only)
PUT    /api/admin/users/:id   # Update user status (admin only)
DELETE /api/admin/users/:id   # Delete user (admin only)
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  shopName: String (required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String (required),
  category: String,
  price: Number (required),
  quantity: Number (required),
  description: String,
  userId: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Purchase Model

```javascript
{
  productId: ObjectId (ref: 'Product'),
  productName: String,
  quantity: Number (required),
  purchasePrice: Number (required),
  totalAmount: Number,
  supplier: String,
  purchaseDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date
}
```

### Expense Model

```javascript
{
  category: String (required),
  amount: Number (required),
  description: String,
  expenseDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date
}
```

### Udhaar Model

```javascript
{
  customerName: String (required),
  customerContact: String,
  amount: Number (required),
  amountPaid: Number (default: 0),
  remainingAmount: Number,
  description: String,
  dueDate: Date,
  status: String (enum: ['pending', 'partial', 'paid']),
  userId: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Sales Model

```javascript
{
  productId: ObjectId (ref: 'Product'),
  productName: String,
  quantity: Number (required),
  sellingPrice: Number (required),
  totalAmount: Number,
  customerName: String,
  saleDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date
}
```

### Report Model

```javascript
{
  reportType: String (required),
  startDate: Date,
  endDate: Date,
  totalSales: Number,
  totalExpenses: Number,
  totalProfit: Number,
  data: Object,
  userId: ObjectId (ref: 'User'),
  createdAt: Date
}
```

## Project Structure

```
Backend/
├── api/
│   └── index.js            # Serverless function entry point
├── controllers/            # Request handlers
│   ├── AdminController.js
│   ├── DashboardController.js
│   ├── ExpenseController.js
│   ├── ProductController.js
│   ├── PurchaseController.js
│   ├── ReportController.js
│   ├── SalesController.js
│   ├── UdhaarController.js
│   ├── authController.js
│   ├── otpController.js
│   └── profileController.js
├── middlewares/            # Custom middleware
│   ├── authMiddleware.js   # JWT verification
│   └── adminMiddleware.js  # Admin authorization
├── models/                 # Mongoose schemas
│   ├── Expense.js
│   ├── Product.js
│   ├── Purchase.js
│   ├── Report.js
│   ├── Sales.js
│   ├── Udhaar.js
│   ├── User.js
│   └── UserStatus.js
├── routes/                 # API routes
│   ├── AdminRoutes.js
│   ├── DashboardRoutes.js
│   ├── ExpenseRoutes.js
│   ├── ProductRoutes.js
│   ├── PurchaseRoutes.js
│   ├── ReportRoutes.js
│   ├── SalesRoutes.js
│   ├── UdhaarRoutes.js
│   ├── authRoutes.js
│   ├── otpRoutes.js
│   └── profileRoute.js
├── utils/                  # Utility functions
│   ├── emailService.js     # Email sending utilities
│   └── validators.js       # Input validation
├── .env                    # Environment variables (not in repo)
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── seed.js                 # Database seeding script
├── server.js               # Express server setup
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## Security

### Authentication Middleware

All protected routes require JWT authentication:

```javascript
// In authMiddleware.js
const protect = async (req, res, next) => {
  // Verify JWT token from Authorization header
  // Attach user to request object
  // Continue to next middleware
};
```

### Admin Middleware

Admin-only routes have additional authorization:

```javascript
// In adminMiddleware.js
const adminOnly = (req, res, next) => {
  // Check if user role is 'admin'
  // Grant or deny access
};
```

### Password Security

- Passwords are hashed using bcrypt with salt rounds
- Original passwords are never stored
- Password reset uses secure token mechanism

### CORS Configuration

CORS is configured to accept requests only from approved origins:

```javascript
app.use(cors({
  origin: [
    'https://haroon-90.github.io',
    'http://localhost:5173',
    'https://dukaan-digital.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
```

### Environment Variables

All sensitive data is stored in environment variables and never hardcoded.

## Deployment

### Vercel Deployment

The application is configured for Vercel serverless deployment.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. The `vercel.json` configuration handles routing:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

### Environment Variables on Vercel

Set the following environment variables in Vercel dashboard:
- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- All other variables from `.env`

### Production URL

The backend is deployed at: https://dukaan-digital-backend.vercel.app

## Error Handling

### Centralized Error Handler

All errors are caught and formatted consistently:

```javascript
// Error response format
{
  success: false,
  error: "Error message",
  statusCode: 400,
  stack: "Stack trace (development only)"
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected errors)

### Validation

Input validation is performed using:
- Mongoose schema validation
- Custom validators in `utils/validators.js`
- Express middleware validation

## Available Scripts

```bash
npm run dev   # Start development server with auto-reload
npm test      # Run tests (to be implemented)
node seed.js  # Seed database with initial data
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow Node.js best practices
- Use ES6+ features
- Write clean, documented code
- Use meaningful variable and function names
- Add comments for complex logic

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%

## License

This project is licensed under the ISC License.

---

**Built with Node.js and Express for scalable retail business management.**

For frontend documentation, refer to the Frontend README.md file.

API Base URL: https://dukaan-digital-backend.vercel.app/api