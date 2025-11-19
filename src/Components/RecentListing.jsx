import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function RecentListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings?limit=6") // Adjust your API route
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="container mx-auto px-4 mt-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        Recent Listings
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-200"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.category}</p>

              {/* Price */}
              <p className="text-lg font-semibold text-gray-900 mt-3">
                {item.price > 0 ? `৳ ${item.price}` : "Free for Adoption"}
              </p>

              {/* Location */}
              <p className="text-sm text-gray-500 mt-1">📍 {item.location}</p>

              {/* Button */}
              <button
                onClick={() => navigate(`/listing/${item._id}`)}
                className="w-full mt-5 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                See Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
