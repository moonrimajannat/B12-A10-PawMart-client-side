import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PetsAndSupplies from './pages/PetsAndSupplies'
import CategoryFiltered from './pages/CategoryFiltered'
import ListingDetails from './pages/ListingDetails'
import AddListing from './pages/AddListing'
import MyListings from './pages/MyListings'
import MyOrders from './pages/MyOrders'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'


function PrivateRoute({ children }) {
const { user, loading } = useAuth();
if (loading) return <div className="p-8">Loading...</div>;
return user ? children : <Navigate to="/login" replace />;
}


export default function App(){
return (
<div className="min-h-screen flex flex-col">
<Toaster position="top-right" />
<Navbar />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/pets-supplies" element={<PetsAndSupplies/>} />
<Route path="/category-filtered-product/:categoryName" element={<CategoryFiltered/>} />


<Route path="/listing/:id" element={<PrivateRoute><ListingDetails/></PrivateRoute>} />
<Route path="/add-listing" element={<PrivateRoute><AddListing/></PrivateRoute>} />
<Route path="/my-listings" element={<PrivateRoute><MyListings/></PrivateRoute>} />
<Route path="/my-orders" element={<PrivateRoute><MyOrders/></PrivateRoute>} />


<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />


<Route path="*" element={<NotFound/>} />
</Routes>
</main>
<Footer />
</div>
)
}
