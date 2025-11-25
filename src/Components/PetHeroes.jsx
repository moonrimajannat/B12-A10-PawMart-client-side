
const heroes = [
  {
    name: "Ayesha & Coco",
    story:
      "Ayesha adopted Coco after he was rescued from the streets. Now he enjoys long walks and endless cuddles.",
    img: "https://placedog.net/500/400",
  },
  {
    name: "Rahim – Street Cat Guardian",
    story:
      "Rahim cares for 15+ stray cats, ensuring they are fed, vaccinated, and safe.",
    img: "https://i.ibb.co.com/ycq74M5j/beautiful-shot-cute-beagle-dog.jpg",
  },
  {
    name: "Tanvi & Momo",
    story:
      "Tanvi adopted Momo when she was abandoned as a baby. Now she is playful and the heart of their home.",
    img: "https://placedog.net/501/400",
  },
  {
    name: "Kamal & Bruno",
    story:
      "Bruno was found injured near a roadside. Kamal rescued him, provided treatment, and now Bruno lives a joyful, healthy life.",
    img: "https://i.ibb.co.com/gL8QhGGD/happy-pet-dogs-playing-park.jpg",
  },
];

export default function PetHeroes() {
  return (
    <section className="container mx-auto px-4 mt-20 mb-28">
      <div className="flex items-center justify-center gap-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Meet Our Pet Heroes
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {heroes.map((hero, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-full h-48 md:h-56 overflow-hidden">
              <img
                src={hero.img}
                alt={hero.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {hero.name}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {hero.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}