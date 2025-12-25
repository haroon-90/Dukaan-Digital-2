# Dukaan Digital - Frontend

A modern, Progressive Web Application (PWA) designed to help shopkeepers efficiently manage their inventory, sales, expenses, and customer credit accounts (Udhaar). Built with React and Vite for optimal performance and user experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Progressive Web App Features](#progressive-web-app-features)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Overview

Dukaan Digital Frontend is a comprehensive business management solution tailored for small to medium-sized retail shops. The application provides an intuitive interface for managing daily business operations, tracking inventory, monitoring sales, and maintaining customer credit records.

## Features

### Core Functionality

- **User Authentication**
  - Secure login and registration system
  - JWT-based authentication
  - Password encryption
  - Session management

- **Dashboard**
  - Real-time business analytics
  - Sales overview and trends
  - Inventory status at a glance
  - Quick access to key metrics
  - Visual charts and graphs using Recharts

- **Product Management**
  - Add, edit, and delete products
  - Track product inventory levels
  - Product categorization
  - Stock alerts and notifications
  - Bulk product operations

- **Sales Management**
  - Record sales transactions
  - Generate invoices
  - Sales history and tracking
  - Print and export sales receipts
  - Daily, and monthly sales reports

- **Purchase Management**
  - Record product purchases
  - Track supplier information
  - Purchase history
  - Stock replenishment tracking

- **Expense Tracking**
  - Record business expenses
  - Categorize expenses
  - Expense history and reports
  - Monthly expense summaries

- **Udhaar (Credit) Management**
  - Track customer credit accounts
  - Record credit transactions
  - Payment history
  - Outstanding balance tracking
  - Customer-wise credit reports

- **Reports & Analytics**
  - Comprehensive business reports
  - Profit and loss statements
  - Inventory reports
  - Sales analytics
  - Export reports as PDF
  - Visual data representation

- **Profile Management**
  - User profile customization
  - Business information management
  - Account settings

- **Admin Panel**
  - User management (admin only)
  - System-wide analytics
  - User status control
  - Business oversight

### User Experience Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Progressive Web App**: Installable on devices, works offline
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error management
- **Print Functionality**: Print invoices and reports directly
- **PDF Export**: Generate PDF documents for invoices and reports

## Technology Stack

### Core Technologies

- **React 19.1.0**: Modern JavaScript library for building user interfaces
- **React Router DOM 7.8.0**: Declarative routing for React applications
- **Vite 7.0.4**: Next-generation frontend build tool
- **Axios 1.11.0**: Promise-based HTTP client for API calls

### UI & Styling

- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **Tailwind Merge 3.3.1**: Utility for merging Tailwind CSS classes
- **Lucide React**: Modern icon library
- **React Icons 5.5.0**: Popular icon library
- **FontAwesome 7.0.0**: Comprehensive icon toolkit

### Data Visualization

- **Recharts 3.1.2**: Composable charting library built on React components

### PWA & Utilities

- **Vite Plugin PWA 1.0.3**: Zero-config PWA plugin for Vite
- **React Hot Toast 2.5.2**: Lightweight notification library
- **html-to-image 1.11.13**: Convert HTML to images
- **jsPDF 3.0.4**: PDF generation library
- **React to Print 3.2.0**: Print React components

### Development Tools

- **ESLint 9.30.1**: Code linting and quality assurance
- **gh-pages 6.3.0**: GitHub Pages deployment utility

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (or yarn/pnpm)
- **Git**: For version control

## Installation

1. Clone the repository:

```bash
git clone https://github.com/haroon-90/Dukaan-Digital.git
cd Dukaan-Digital/Frontend
```

2. Install dependencies:

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the Frontend directory (if needed for future configurations):

```env
# Currently, API configuration is handled in src/services/api.js
# Add any environment-specific variables here
```

### API Configuration

The API base URL is configured in `src/services/api.js`:

```javascript
// For production (Vercel deployment)
baseURL: "https://dukaan-digital-backend.vercel.app/api"

// For local development
// baseURL: "http://localhost:5000/api"
```

Update the `baseURL` based on your deployment environment.

### Deployment Configuration

Refer to the `deploy_rule.md` file in the root directory for detailed deployment instructions for different platforms.

#### For Vercel Deployment

Ensure the following configurations:

- `vite.config.js`: Comment out or remove the `base` property
- `src/App.jsx`: Use `<BrowserRouter>` without basename
- `public/manifest.json`: Set `start_url` to `"/"`

#### For GitHub Pages Deployment

Ensure the following configurations:

- `vite.config.js`: Set `base: '/Dukaan-Digital/'`
- `src/App.jsx`: Use `<BrowserRouter basename="/Dukaan-Digital/">`
- `public/manifest.json`: Set `start_url` to `"/Dukaan-Digital/"`

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Preview Production Build

Build and preview the production version locally:

```bash
npm run build
npm run preview
```

## Building for Production

Generate optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

### Deploy to GitHub Pages

```bash
npm run deploy
```

This command will build the project and deploy it to GitHub Pages.

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Vercel will automatically detect the Vite configuration
4. Deploy automatically or manually trigger deployment

The application is currently deployed at:
- **Vercel**: https://dukaan-digital.vercel.app
- **GitHub Pages**: https://haroon-90.github.io/Dukaan-Digital

## Project Structure

```
Frontend/
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # Application icon
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard page
│   │   ├── products/       # Product management
│   │   ├── sales/          # Sales management
│   │   ├── purchase/       # Purchase management
│   │   ├── expenses/       # Expense tracking
│   │   ├── udhaar/         # Credit management
│   │   ├── reports/        # Reports and analytics
│   │   ├── profile/        # User profile
│   │   ├── admin/          # Admin panel
│   │   └── about/          # About pages
│   ├── services/           # API service modules
│   │   ├── api.js          # Axios instance configuration
│   │   ├── authServices.js
│   │   ├── productServices.js
│   │   ├── purchaseServices.js
│   │   ├── expenseServices.js
│   │   ├── udhaarServices.js
│   │   ├── reportServices.js
│   │   ├── dashboardServices.js
│   │   ├── profileServices.js
│   │   └── adminServices.js
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run deploy` - Deploy to GitHub Pages

## Progressive Web App Features

The application is a fully functional PWA with the following capabilities:

### Offline Support

- Service worker caching for offline functionality
- Cache-first strategy for frontend assets
- Network-first strategy for API calls with cache fallback

### Installable

- Can be installed on desktop and mobile devices
- Works like a native application
- Accessible from home screen/desktop

### Auto-Update

- Automatic updates when new versions are available
- Background sync for data
- Push notifications support (future enhancement)

### Manifest Configuration

The `manifest.json` includes:
- Application name and description
- Icons for different sizes
- Theme colors
- Display mode (standalone)
- Start URL configuration

## API Integration

All API calls are centralized in the `src/services/` directory.

### Service Structure

Each service module handles specific domain operations:

- **authServices.js**: Login, registration, authentication
- **productServices.js**: Product CRUD operations
- **purchaseServices.js**: Purchase transaction management
- **expenseServices.js**: Expense tracking operations
- **udhaarServices.js**: Credit account management
- **reportServices.js**: Report generation and analytics
- **dashboardServices.js**: Dashboard data aggregation
- **profileServices.js**: User profile management
- **adminServices.js**: Administrative operations

### Authentication

JWT tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

### Error Handling

All API errors are handled gracefully with user-friendly toast notifications.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint rules defined in `eslint.config.js`
- Use functional components with React Hooks
- Maintain consistent naming conventions
- Write clean, readable code with proper comments

## License

This project is licensed under the ISC License.

---

**Developed with modern web technologies for efficient business management.**

For backend documentation, refer to the Backend README.md file.

For deployment instructions, see deploy_rule.md in the root directory.