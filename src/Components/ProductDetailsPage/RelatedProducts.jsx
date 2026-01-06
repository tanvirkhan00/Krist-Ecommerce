import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addToCart, WishList } from '../Slice/productSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const RelatedProducts = ({ filterCategory }) => {
    const dispatch = useDispatch();

    // Import Account
    let account = useSelector((state) => state.product.Account);
    
    // Add Cart
    let handleCart = (itemId) => {
        let auth = getAuth();
        let user = auth.currentUser;

        if (!user) {
            alert("Please Create Account");
        } else if (user.emailVerified == false) {
            alert("Please Verify Gmail");
        } else {
            dispatch(addToCart({ ...itemId, qty: 1 }));
        }
    };

    // WishList 
    let handleWishList = (itemId) => {
        dispatch(WishList({ ...itemId, qty: 1 }));
    };

    return (
        <section className="bg-white py-12">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-medium">You may also like</h2>
                </div>

                {/* Products Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={2}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 16,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 16,
                        },
                    }}
                    className="related-products-swiper"
                >
                    {filterCategory.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="group">
                                {/* Product Image */}
                                <div className="relative bg-gray-100 mb-3 overflow-hidden aspect-square">
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 p-4"
                                            src={item.thumbnail}
                                            alt={item.title}
                                        />
                                    </Link>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                                    {/* Quick Add Button */}
                                    <button
                                        onClick={() => handleCart(item)}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap hover:bg-gray-100"
                                    >
                                        Add to cart
                                    </button>

                                    {/* Wishlist & View Icons */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => handleWishList(item)}
                                            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                                        >
                                            <CiHeart className="w-5 h-5" />
                                        </button>
                                        <Link to={`/product/${item.id}`}>
                                            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                                                <IoEyeOutline className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="text-sm font-normal line-clamp-2 group-hover:underline cursor-pointer">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                                    <p className="text-sm font-medium">${item.price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom CSS for Swiper Navigation */}
            <style jsx>{`
                .related-products-swiper {
                    padding-bottom: 50px;
                }

                .related-products-swiper .swiper-button-next,
                .related-products-swiper .swiper-button-prev {
                    color: #000;
                    background: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }

                .related-products-swiper .swiper-button-next:after,
                .related-products-swiper .swiper-button-prev:after {
                    font-size: 16px;
                    font-weight: bold;
                }

                .related-products-swiper .swiper-button-next:hover,
                .related-products-swiper .swiper-button-prev:hover {
                    background: #f3f4f6;
                }

                .related-products-swiper .swiper-pagination-bullet {
                    background: #d1d5db;
                }

                .related-products-swiper .swiper-pagination-bullet-active {
                    background: #000;
                }
            `}</style>
        </section>
    );
};

export default RelatedProducts;