import React, { useContext, useEffect, useState } from "react";
import { apiData } from "./ContextApi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Reviews = () => {
  const products = useContext(apiData);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviews = products.flatMap(
      (product) => product.reviews || []
    );
    setReviews(allReviews.slice(0, 6));
  }, [products]);

  return (
    <section className="mt-[50px] bg-gray-100 py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="font-semibold text-center text-[35px] mb-6">
          What our customers say
        </h1>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={16}
          className="h-[200px]"
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full border-2 border-black rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition">
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">
                    ⭐ {item.rating}/5
                  </p>
                  <p className="text-gray-700 line-clamp-3">
                    “{item.comment}”
                  </p>
                </div>

                <div className="pt-3 text-xs text-gray-500">
                  <p className="font-medium text-black">
                    {item.reviewerName}
                  </p>
                  <p>{item.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
