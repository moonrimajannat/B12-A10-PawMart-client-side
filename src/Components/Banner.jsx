import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {ChevronLeft,ChevronRight} from "lucide-react"; 

import dogPhoto from "../assets/photo-1a.jpeg";
import dogPhoto2 from "../assets/photo-1b.jpg";
import dogPhoto3 from "../assets/photo-1c.jpeg";
import dogPhoto4 from "../assets/photo-1d.jpeg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Banner() {
  return (
    <section className="w-full relative">
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4 pointer-events-none">
        <button
          className="swiper-button-prev text-white bg-black/40 p-3 rounded-full pointer-events-auto"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          className="swiper-button-next text-white bg-black/40 p-3 rounded-full pointer-events-auto"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          nextE1: ".swiper-button-next",
          prevE1: ".swiper-button-prev",
        }}
        className="w-full h-[350px] md:h-[450px] overflow-hidden"
      >
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${dogPhoto})` }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Find Your Furry Friend Today!
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${dogPhoto2})` }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Adopt, Don’t Shop — Give a Pet a Home.
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${dogPhoto3})` }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-4 py-2 rounded-lg">
              Because Every Pet Deserves Love and Care.
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${dogPhoto4})` }}
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
