// src/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute.jsx"

// Layouts
import DashboardLayout from "./layout/DashboardLayout.jsx"
import AuthLayout from "./layout/AuthLayout.jsx"
import AboutLayout from "./layout/AboutLayout.jsx"
import AdminLayout from "./layout/AdminLayout.jsx"

// About
import AboutUs from "../pages/about/AboutUs.jsx"
import ContactUs from "../pages/about/ContactUs.jsx"
import PrivacyPolicy from "../pages/about/PrivacyPolicy.jsx"
import TermaAndConditions from "../pages/about/TermaAndConditions.jsx"

// Auth Pages
import LoginPage from "../pages/auth/LoginPage.jsx"
import RegisterPage from "../pages/auth/RegisterPage.jsx"

// Admin
import Admindashboard from "../pages/admin/admindashboard.jsx"
import EditProfile from "../pages/admin/EditProfile.jsx"

// Dashboard
import DashboardPage from "../pages/dashboard/DashboardPage.jsx"

// Profile
import ProfilePage from "../pages/profile/ProfilePage.jsx"
import EditProfilePage from "../pages/profile/EditProfilePage.jsx"

// Products
import ProductListPage from "../pages/products/ProductListPage.jsx"
import ProductFormPage from "../pages/products/ProductFormPage.jsx"

// Sales
import SalesListPage from "../pages/sales/SalesListPage.jsx"

// Purchase
import PurchaseFormPage from "../pages/purchase/PurchaseFormPage.jsx"

// Udhaar
import UdhaarListPage from "../pages/udhaar/UdhaarListPage.jsx"
import UdhaarFormPage from "../pages/udhaar/UdhaarFormPage.jsx"

// Expenses
import ExpenseListPage from "../pages/expenses/ExpenseListPage.jsx"
import ExpenseFormPage from "../pages/expenses/ExpenseFormPage.jsx"

// Reports
import Reporthomepage from "../pages/reports/Reporthomepage.jsx"

import { Navigate } from "react-router-dom"

export default function AppRouter() {

  return (
    <Routes path="/">

      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Auth Layout Routes */}
      <Route element={<AboutLayout />}>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermaAndConditions />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admindashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/adminprofile" element={<ProfilePage />} />
          <Route path="/admin/profile/edit" element={<EditProfile />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute role="manager" />}>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route path="/manager" element={<DashboardPage />} />

          {/* Profile */}
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit" element={<EditProfilePage />} />
          </Route>

          {/* Products */}
          <Route path="products">
            <Route index element={<ProductListPage />} />
            <Route path="new" element={<ProductFormPage />} />
            <Route path="edit/:id" element={<ProductFormPage />} />
          </Route>

          {/* Sales */}
          <Route path="sales">
            <Route index element={<SalesListPage />} />
            <Route path="new" element={<ProductListPage />} />
            <Route path="purchase" element={<ProductListPage />} />
          </Route>

          {/* Purchase */}
          <Route path="purchase" >
            <Route index element={<SalesListPage />} />
            <Route path="new" element={<PurchaseFormPage />} />
          </Route>

          {/* Udhaar */}
          <Route path="udhaar">
            <Route index element={<UdhaarListPage />} />
            <Route path="new" element={<UdhaarFormPage />} />
            <Route path="edit/:id" element={<UdhaarFormPage />} />
          </Route>

          {/* Expenses */}
          <Route path="expenses">
            <Route index element={<ExpenseListPage />} />
            <Route path="new" element={<ExpenseFormPage />} />
            <Route path="edit/:id" element={<ExpenseFormPage />} />
          </Route>

          {/* Reports */}
          <Route path="reports">
            <Route index element={<Reporthomepage />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}
