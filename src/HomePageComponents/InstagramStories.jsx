import React, { useState } from "react";
import { FaInstagram, FaHeart, FaComment, FaBookmark, FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Images
import Story from "../assets/Fashion.png";
import Story1 from "../assets/Fashion1.png";
import Story2 from "../assets/Fashion2.png";
import Story3 from "../assets/Fashion3.png";
import Story4 from "../assets/Image2.png";

const InstagramStories = () => {
  const stories = [
    { img: Story, likes: "2.3K", comments: "156" },
    { img: Story1, likes: "3.1K", comments: "203" },
    { img: Story2, likes: "1.8K", comments: "127" },
    { img: Story3, likes: "4.2K", comments: "298" },
    { img: Story4, likes: "2.7K", comments: "184" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          {/* Instagram Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
            <FaInstagram className="text-lg animate-pulse" />
            Follow Us on Instagram
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            <span className="block">Our Instagram</span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get inspired by our latest fashion collections and style tips
          </p>

          {/* Instagram Handle */}
          <a 
            href="https://instagram.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold transition-colors group"
          >
            @yourfashionstore
            <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Stories Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              prevEl: '.instagram-button-prev',
              nextEl: '.instagram-button-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={20}
            loop={true}
            className="!pb-12"
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Story Card */}
                  <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-xl border-4 border-white">
                    {/* Instagram Story Border (Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 p-[3px] rounded-3xl -z-10">
                      <div className="bg-white rounded-3xl h-full w-full"></div>
                    </div>

                    {/* Image */}
                    <img
                      src={story.img}
                      alt={`Instagram Story ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Top Bar (Instagram Style) */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-3">
                        {/* Profile Picture */}
                        <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full p-[2px]">
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                            FS
                          </div>
                        </div>
                        {/* Username */}
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">fashionstore</p>
                          <p className="text-white/80 text-xs">2h ago</p>
                        </div>
                        {/* Play Icon */}
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <FaPlay className="text-white text-xs ml-0.5" />
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 h-0.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full w-2/3"></div>
                      </div>
                    </div>

                    {/* Bottom Interaction Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between text-white">
                        {/* Left Actions */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 hover:scale-110 transition-transform">
                            <FaHeart className="text-xl" />
                            <span className="text-sm font-semibold">{story.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:scale-110 transition-transform">
                            <FaComment className="text-xl" />
                            <span className="text-sm font-semibold">{story.comments}</span>
                          </button>
                        </div>
                        {/* Right Action */}
                        <button className="hover:scale-110 transition-transform">
                          <FaBookmark className="text-xl" />
                        </button>
                      </div>

                      {/* View Story Text */}
                      <div className="mt-3">
                        <p className="text-white text-sm font-semibold">Tap to view story</p>
                      </div>
                    </div>

                    {/* Hover Effect - View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2">
                        <FaInstagram className="text-pink-600" />
                        View on Instagram
                      </button>
                    </div>
                  </div>

                  {/* Story Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                    {index + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="instagram-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="instagram-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            
              <a href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <FaInstagram className="text-2xl" />
              <span>Follow Us on Instagram</span>
              <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">We post daily updates</span>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">📸</div>
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-gray-900">50K</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-2xl font-bold text-gray-900">100K</div>
            <div className="text-sm text-gray-600">Likes</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-gray-900">Daily</div>
            <div className="text-sm text-gray-600">Updates</div>
          </div>
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: linear-gradient(to right, #9333ea, #ec4899);
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default InstagramStories;