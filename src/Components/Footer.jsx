import { Link } from "react-router";
import paw from "../assets/paw.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 pt-10 pb-6">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">

        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
            <img src={paw} alt="PawMart Logo" className="w-10 h-10 object-contain" />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            PawMart
          </h2>
        </div>

        <p className="mt-4 mb-4 max-w-xl text-gray-500 text-sm md:text-base leading-relaxed">
          PawMart connects local pet owners and buyers for adoption and pet care products.
        </p>       
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 font-medium text-sm md:text-base">
          <Link
            to="/"
            className="hover:text-blue-500 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-500 transition duration-200"
          >
            Contact
          </Link>

          <Link
            to="/terms"
            className="hover:text-blue-500 transition duration-200"
          >
            Terms
          </Link>
        </div>

        <div className="mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} PawMart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
