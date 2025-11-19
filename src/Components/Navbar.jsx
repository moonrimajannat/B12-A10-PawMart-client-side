import { Link, NavLink } from 'react-router'
import paw from "../assets/paw.png"
export default function Navbar(){
return (
<nav className="bg-gray-100 shadow p-4">
<div className="container mx-auto flex items-center justify-between">
<div className="flex items-center gap-3">
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
                <img src={paw} alt="PawMart Logo" className="w-10 h-10 object-contain" />
              </div>
<Link to="/" className="font-bold text-xl"> PawMart</Link>
</div>


<div className="hidden md:flex gap-6 font-medium">
<NavLink to="/" className="hover:text-blue-500 transition duration-200">Home</NavLink>
<NavLink to="/pets-supplies" className="hover:text-blue-500 transition duration-200">Pets & Supplies</NavLink>
<>
{/* <NavLink to="/add-listing">Add Listing</NavLink>
<NavLink to="/my-listings">My Listings</NavLink>
<NavLink to="/my-orders">My Orders</NavLink> */}
</>
</div>


<div className="flex items-center gap-4 font-semibold">
<>
<Link to="/login" className="btn">Login</Link>
<Link to="/register" className="btn-outline">Register</Link>
</>

</div>
</div>
</nav>
)
}