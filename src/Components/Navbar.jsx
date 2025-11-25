import { Link, NavLink, useNavigate } from 'react-router';
import paw from "../assets/paw.png";
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Thank you", "Sign Out successfully", "success");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

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


            {user ? (
              <>
                <button
                  onClick={handleLogOut}
                  className="btn">
                  Log Out
                </button>
                {/* Avatar */}
                <div className="group">
                  {user?.photoURL ? (
                    <img
                      className="w-[45px] h-[45px] mx-3 rounded-full object-cover"
                      src={user?.photoURL}
                      alt="user"
                    />
                  ) : (
                    <img
                      className="w-[45px] h-[45px] mx-3 rounded-full object-cover"
                      src="https://i.ibb.co/VC1vhmp/user.png"
                      alt="default user"
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn-outline">Register</Link>
              </>
            )}
          </>

        </div>
      </div>
    </nav>
  )
}