import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Images
import Story from "../assets/Fashion.png";
import Story1 from "../assets/Fashion1.png";
import Story2 from "../assets/Fashion2.png";
import Story3 from "../assets/Fashion3.png";
import Story4 from "../assets/Image2.png";

const InstagramStories = () => {
  const stories = [Story, Story1, Story2, Story3, Story4];

  return (
    <section className="my-[50px]">
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-[35px] font-semibold text-center mb-6">
          Our Instagram Stories
        </h1>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          loop={true}
          className="h-[500px]"   // 🔥 IMPORTANT
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {stories.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[500px] overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`Story ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InstagramStories;
