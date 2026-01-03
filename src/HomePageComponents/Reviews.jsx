import React, { useContext, useEffect, useState } from "react";
import { apiData } from "../Components/ContextApi";
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Reviews = () => {
  const products = useContext(apiData);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviews = products.flatMap((product) => product.reviews || []);
    setReviews(allReviews.slice(0, 12));
  }, [products]);

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  // Get random avatar color
  const getAvatarColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-orange-400 to-orange-600',
      'bg-gradient-to-br from-red-400 to-red-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            <FaStar className="animate-spin" style={{ animationDuration: '3s' }} />
            Customer Testimonials
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            What Our Customers
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">4.8</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {renderStars(4.8)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Rating</div>
            </div>
            <div className="hidden sm:block w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div className="hidden sm:block w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600 mt-2">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={24}
            className="!pb-12"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group h-full bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                      <FaQuoteLeft className="text-white text-xl" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-6 min-h-[120px]">
                    <p className="text-gray-700 leading-relaxed line-clamp-5 text-sm md:text-base">
                      "{item.comment}"
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                      {item.reviewerName ? item.reviewerName.charAt(0).toUpperCase() : <FiUser />}
                    </div>
                    
                    {/* Name and Date */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base md:text-lg truncate">
                        {item.reviewerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* Verified Badge */}
                    <div className="hidden sm:flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0">
                      <span>✓</span>
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-semibold text-gray-900">Award Winning</div>
            <div className="text-sm text-gray-600">Service</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">🚚</div>
            <div className="font-semibold text-gray-900">Fast Delivery</div>
            <div className="text-sm text-gray-600">Worldwide</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">💯</div>
            <div className="font-semibold text-gray-900">Quality</div>
            <div className="text-sm text-gray-600">Guaranteed</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold text-gray-900">Secure</div>
            <div className="text-sm text-gray-600">Payment</div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        :global(.swiper-pagination-bullet-active) {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Reviews;