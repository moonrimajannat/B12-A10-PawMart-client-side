import { useEffect, useState } from "react";
import axios from "axios";
import Helmet from "../Helmet/Helmet";
import { useNavigate } from "react-router";

export default function PetsSupplies() {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
     const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://b12-a10-paw-mart-server-side.vercel.app/listings")
            .then((res) => {
                setListings(res.data);
                setFilteredListings(res.data);
            })
    }, []);

    useEffect(() => {
        if (categoryFilter === "" || categoryFilter === "All") {
            setFilteredListings(listings);
        } else {
            setFilteredListings(listings.filter((item) => item.category === categoryFilter));
        }
    }, [categoryFilter, listings]);

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            <Helmet title="Pets & Supplies Page" />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Pets & Supplies</h1>

                {/* Filter */}
                <div className="flex justify-center mb-6 px-">
                    <select
                        className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Pets">Pets</option>
                        <option value="Food">Food</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Care Products">Care Products</option>
                    </select>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <div
                                key={listing._id}
                                className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                            >
                                <div className="h-56 w-full overflow-hidden">
                                    <img
                                        src={listing.image}
                                        alt={listing.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800">{listing.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{listing.category}</p>

                                    <p className="text-lg font-semibold text-gray-900 mt-3">
                                        {listing.price > 0 ? `$ ${listing.price}` : "Free for Adoption"}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">📍 {listing.location}</p>
                                    
                                    <button
                                        onClick={() => navigate(`/listingDetails/${listing._id}`)}
                                        className="cursor-pointer w-full mt-5 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                                    >
                                        See Details →
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No listings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}