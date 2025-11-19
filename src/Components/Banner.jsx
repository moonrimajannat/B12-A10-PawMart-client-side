import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import dogPhoto from "../assets/photo-1a.jpeg"
import dogPhoto2 from "../assets/photo-1b.jpg"
import dogPhoto3 from "../assets/photo-1c.jpeg"
import dogPhoto4 from "../assets/photo-1d.jpeg"
import "swiper/css";
import "swiper/css/pagination";

export default function Banner() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-[350px] md:h-[450px] overflow-hidden"
      >

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
            backgroundImage: `url(${dogPhoto})`,
           }}
           >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Find Your Furry Friend Today!
            </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:`url(${dogPhoto2})`,
            }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Adopt, Don’t Shop — Give a Pet a Home.
            </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:`url(${dogPhoto3})`,
            }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Because Every Pet Deserves Love and Care.
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:`url(${dogPhoto4})`,
            }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Happy Owners. Happy Pets. Happy Homes.
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
