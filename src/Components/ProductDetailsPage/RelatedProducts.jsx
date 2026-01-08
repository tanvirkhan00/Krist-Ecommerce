import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addToCart, WishList } from '../Slice/productSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline, IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { HiMiniSparkles } from "react-icons/hi2";

const RelatedProducts = ({ filterCategory }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [successToast, setSuccessToast] = useState({ show: false, message: '' });
    const [hoveredProduct, setHoveredProduct] = useState(null);

    // Import Account
    const account = useSelector((state) => state.product.Account);

    // Show success toast
    const showSuccessToast = (message) => {
        setSuccessToast({ show: true, message });
        setTimeout(() => {
            setSuccessToast({ show: false, message: '' });
        }, 3000);
    };

    // Check Authentication
    const checkAuth = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            setAuthError('Please log in to continue');
            setShowAuthModal(true);
            return false;
        }
        
        if (!user.emailVerified) {
            setAuthError('Please verify your email to continue');
            setShowAuthModal(true);
            return false;
        }
        
        return true;
    };

    // Add to Cart with Authentication Check
    const handleCart = (itemId, e) => {
        e?.stopPropagation();
        if (!checkAuth()) return;
        
        dispatch(addToCart({ ...itemId, qty: 1 }));
        showSuccessToast('Added to cart');
    };

    // Add to Wishlist with Authentication Check
    const handleWishList = (itemId, e) => {
        e?.stopPropagation();
        if (!checkAuth()) return;
        
        dispatch(WishList({ ...itemId, qty: 1 }));
        showSuccessToast('Added to wishlist');
    };

    // Handle Auth Modal Actions
    const handleGoToLogin = () => {
        setShowAuthModal(false);
        navigate('/login');
    };

    const handleGoToSignup = () => {
        setShowAuthModal(false);
        navigate('/signUp');
    };

    return (
        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
                
                * {
                    font-family: 'Poppins', sans-serif;
                }
                
                .heading-font {
                    font-family: 'Playfair Display', serif;
                }

                .related-products-swiper {
                    padding: 20px 0 60px 0;
                }

                .related-products-swiper .swiper-button-next,
                .related-products-swiper .swiper-button-prev {
                    color: white;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                    transition: all 0.3s ease;
                }

                .related-products-swiper .swiper-button-next:after,
                .related-products-swiper .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }

                .related-products-swiper .swiper-button-next:hover,
                .related-products-swiper .swiper-button-prev:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
                }

                .related-products-swiper .swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .related-products-swiper .swiper-pagination {
                    bottom: 20px !important;
                }

                .related-products-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #cbd5e1;
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                .related-products-swiper .swiper-pagination-bullet-active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    width: 24px;
                    border-radius: 5px;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Toast */}
                {successToast.show && (
                    <div className="fixed top-24 right-6 z-[60] animate-slide-in">
                        <div className="bg-white rounded-xl shadow-2xl px-6 py-4 flex items-center gap-3 border border-green-100">
                            <IoCheckmarkCircle className="text-green-500 text-2xl flex-shrink-0" />
                            <p className="text-gray-800 font-medium">{successToast.message}</p>
                        </div>
                    </div>
                )}

                {/* Authentication Modal */}
                {showAuthModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-slide-in">
                        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative border border-gray-100">
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            >
                                <IoClose size={24} />
                            </button>
                            
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3">
                                    <MdErrorOutline className="text-white text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 heading-font">
                                        Authentication Required
                                    </h3>
                                    <p className="text-gray-600">
                                        {authError}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleGoToLogin}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={handleGoToSignup}
                                    className="flex-1 bg-white text-gray-700 px-6 py-3.5 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full mb-3">
                        <HiMiniSparkles className="text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">Curated for You</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 heading-font">
                        You May Also Like
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover more products you'll love
                    </p>
                </div>

                {/* Products Carousel */}
                {filterCategory.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        navigation
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true 
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={filterCategory.length > 4}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 24,
                            },
                        }}
                        className="related-products-swiper"
                    >
                        {filterCategory.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div 
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group h-full"
                                    onMouseEnter={() => setHoveredProduct(item.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    {/* Product Image */}
                                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 aspect-square overflow-hidden">
                                        <Link to={`/product/${item.id}`}>
                                            <img
                                                className="w-full h-full object-cover p-4 transition-transform duration-700 group-hover:scale-110"
                                                src={item.thumbnail}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </Link>

                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${hoveredProduct === item.id ? 'opacity-100' : 'opacity-0'}`}></div>

                                        {/* Quick Actions */}
                                        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-500 ${hoveredProduct === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                                            <button
                                                onClick={(e) => handleWishList(item, e)}
                                                className="bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                                                title="Add to wishlist"
                                            >
                                                <CiHeart className="w-4 h-4 text-gray-700" />
                                            </button>
                                            <Link to={`/product/${item.id}`}>
                                                <button 
                                                    className="bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                                                    title="Quick view"
                                                >
                                                    <IoEyeOutline className="w-4 h-4 text-gray-700" />
                                                </button>
                                            </Link>
                                        </div>

                                        {/* Discount Badge */}
                                        {item.discountPercentage > 10 && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                                    -{Math.round(item.discountPercentage)}%
                                                </span>
                                            </div>
                                        )}

                                        {/* Quick Add Button */}
                                        <button
                                            onClick={(e) => handleCart(item, e)}
                                            className={`absolute bottom-3 left-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-bold transition-all duration-500 hover:shadow-xl hover:scale-105 ${hoveredProduct === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <Link to={`/product/${item.id}`}>
                                            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1.5 capitalize">
                                                {item.category}
                                            </p>
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 min-h-[2.5rem]">
                                                {item.title}
                                            </h3>
                                        </Link>
                                        
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-baseline gap-1.5">
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${item.price}
                                                </p>
                                                {item.discountPercentage > 0 && (
                                                    <p className="text-xs text-gray-400 line-through">
                                                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Rating */}
                                            {item.rating && (
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                                                    <span className="text-yellow-500 text-xs">⭐</span>
                                                    <span className="text-xs font-semibold text-gray-700">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 heading-font">
                                No Related Products
                            </h3>
                            <p className="text-gray-600">
                                Check back later for recommendations
                            </p>
                        </div>
                    </div>
                )}

                {/* View All Button */}
                {filterCategory.length > 0 && (
                    <div className="text-center mt-10">
                        <Link to="/shop">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                                <span>Explore More Products</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RelatedProducts;