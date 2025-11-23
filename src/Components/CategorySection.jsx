import { useNavigate } from "react-router";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Pets (Adoption)",
      icon: "🐾",
      route: "pets",
      gradient: "from-pink-200 to-pink-400",
    },
    {
      name: "Pet Food",
      icon: "🍖",
      route: "pet-food",
      gradient: "from-yellow-200 to-yellow-400",
    },
    {
      name: "Accessories",
      icon: "🎀",
      route: "accessories",
      gradient: "from-purple-200 to-purple-400",
    }
    ,
    {
      name: "Pet Care Products",
      icon: "🧴",
      route: "pet-care-products",
      gradient: "from-blue-200 to-blue-400",
    },
  ];

  return (
    <section className="container mx-auto px-4 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 tracking-tight">
        Categories Section 
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() =>
              navigate(`/category-filtered-product/${cat.route}`)
            }
            className="group cursor-pointer p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div
              className={`w-20 h-20 mx-auto flex items-center justify-center text-5xl rounded-full bg-gradient-to-br ${cat.gradient} shadow-inner group-hover:scale-110 transition-transform`}
            >
              {cat.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 text-center group-hover:text-gray-900">
              {cat.name}
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              Explore all {cat.name}
            </p>

            <div className="mt-4 text-center">
              <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Now →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
