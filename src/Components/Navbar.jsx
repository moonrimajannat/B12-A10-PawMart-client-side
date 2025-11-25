import { Link, NavLink, useNavigate } from "react-router";
import paw from "../assets/paw.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
            <img
              src={paw}
              alt="PawMart Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <Link to="/" className="font-bold text-xl">
            PawMart
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          <NavLink
            to="/"
            className="hover:text-blue-500 transition duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/pets-supplies"
            className="hover:text-blue-500 transition duration-200"
          >
            Pets & Supplies
          </NavLink>
          <NavLink
            to="/add-listing"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            Add Listing
          </NavLink>
          <NavLink
            to="/my-listings"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            My Listings
          </NavLink>
        </div>

        {/* Auth + Avatar */}
        <div className="hidden md:flex items-center gap-4 font-semibold">
          {user ? (
            <>
              <button onClick={handleLogOut} className="btn">
                Log Out
              </button>
              <div className="group">
                <img
                  className="w-[45px] h-[45px] mx-3 rounded-full object-cover"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/VC1vhmp/user.png"
                  }
                  alt="user"
                />
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn-outline">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 bg-gray-50 p-4 mt-2 rounded-lg shadow">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            Home
          </NavLink>

          <NavLink
            to="/pets-supplies"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            Pets & Supplies
          </NavLink>
          <NavLink
            to="/add-listing"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            Add Listing
          </NavLink>
          <NavLink
            to="/my-listings"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-500 transition duration-200"
          >
            My Listings
          </NavLink>

          <hr />

          {user ? (
            <>
              <button onClick={handleLogOut} className="btn w-full">
                Log Out
              </button>
              <div className="flex justify-center">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/VC1vhmp/user.png"
                  }
                />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-outline w-full"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}