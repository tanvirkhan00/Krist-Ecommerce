import React from 'react';
import { FiArrowRight } from "react-icons/fi";
import woman from "../assets/womanShoping.png";
import { Link } from 'react-router-dom';

const HeroHome = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="min-h-[calc(100vh-100px)] lg:min-h-[600px] flex items-center py-12 sm:py-16 lg:py-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12">

                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8 max-w-xl lg:max-w-none order-2 lg:order-1">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                New Collection 2024
                            </div>

                            {/* Heading */}
                            <div className="space-y-3 lg:space-y-4">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 tracking-wide">
                                    Classic Exclusive
                                </h3>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Woman's
                                    </span>
                                    <br />
                                    <span className="text-gray-900">Collection</span>
                                </h1>
                            </div>

                            {/* Discount Badge */}
                            <div className="inline-block">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl sm:text-2xl shadow-lg transform hover:scale-105 transition-transform">
                                    Up to 40% Off
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
                                Discover timeless elegance with our curated collection of premium women's fashion
                            </p>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                                <Link to="/shop">
                                    <button className="group relative inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:scale-105">
                                        <span className="relative z-10">Shop Now</span>
                                        <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </Link>

                                <button className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300">
                                    View Collection
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start pt-4 lg:pt-8">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">200+</div>
                                    <div className="text-sm text-gray-600">Products</div>
                                </div>
                                <div className="w-px bg-gray-300"></div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">50K+</div>
                                    <div className="text-sm text-gray-600">Happy Customers</div>
                                </div>
                                <div className="w-px bg-gray-300"></div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">4.9★</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex-1 w-full max-w-md lg:max-w-none order-1 lg:order-2">
                            <div className="relative">
                                {/* Decorative circle behind image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform scale-90 blur-3xl opacity-20"></div>

                                {/* Image container */}
                                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={woman}
                                        alt="Woman shopping fashion collection"
                                        className="w-full h-auto drop-shadow-2xl"
                                    />
                                </div>

                                {/* Floating elements */}
                                <div className="hidden lg:block absolute top-10 right-0 bg-white p-4 rounded-lg shadow-xl animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">✓</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Free Shipping</div>
                                            <div className="text-sm text-gray-600">On orders $50+</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden lg:block absolute bottom-20 left-0 bg-white p-4 rounded-lg shadow-xl animate-float animation-delay-1000">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎁</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Special Offer</div>
                                            <div className="text-sm text-gray-600">Limited time only</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
};

export default HeroHome;