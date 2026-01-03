import React, { useState, useEffect } from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';
import { FiClock, FiTag, FiTrendingUp } from 'react-icons/fi';
import womanImage from "../assets/womanShoping2.png";
import { Link } from 'react-router-dom';

const OfferMonthly = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 120,
        hours: 18,
        minutes: 15,
        seconds: 10
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='relative py-16 md:py-20 lg:py-24 overflow-hidden'>
            {/* Background Gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
                    
                    {/* Content Section */}
                    <div className='flex-1 space-y-6 lg:space-y-8 text-center lg:text-left'>
                        {/* Badge */}
                        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
                            <FiTag className='animate-bounce' />
                            Limited Time Offer
                        </div>

                        {/* Heading */}
                        <div className='space-y-3'>
                            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight'>
                                Deals of the
                                <span className='block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
                                    Month
                                </span>
                            </h1>
                            <div className='flex items-center gap-2 text-orange-600 font-semibold justify-center lg:justify-start'>
                                <FiTrendingUp />
                                <span>Save up to 60% off</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0'>
                            Don't miss out on our exclusive monthly deals! Discover amazing discounts on premium products with limited stock available. Shop now and save big!
                        </p>

                        {/* Countdown Timer */}
                        <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100'>
                            <div className='flex items-center gap-2 justify-center lg:justify-start mb-4 text-gray-700'>
                                <FiClock className='text-orange-600' />
                                <span className='font-semibold'>Offer ends in:</span>
                            </div>
                            
                            <div className='grid grid-cols-4 gap-3 md:gap-4'>
                                {/* Days */}
                                <div className='relative group'>
                                    <div className='bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg transform group-hover:scale-105 transition-transform'>
                                        <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white'>
                                            {String(timeLeft.days).padStart(2, '0')}
                                        </h2>
                                        <h4 className='font-semibold text-xs md:text-sm text-orange-100 mt-1'>Days</h4>
                                    </div>
                                    <div className='absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-b-xl opacity-50 blur-sm'></div>
                                </div>

                                {/* Hours */}
                                <div className='relative group'>
                                    <div className='bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg transform group-hover:scale-105 transition-transform'>
                                        <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white'>
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </h2>
                                        <h4 className='font-semibold text-xs md:text-sm text-orange-100 mt-1'>Hours</h4>
                                    </div>
                                    <div className='absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-b-xl opacity-50 blur-sm'></div>
                                </div>

                                {/* Minutes */}
                                <div className='relative group'>
                                    <div className='bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg transform group-hover:scale-105 transition-transform'>
                                        <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white'>
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </h2>
                                        <h4 className='font-semibold text-xs md:text-sm text-orange-100 mt-1'>Mins</h4>
                                    </div>
                                    <div className='absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-b-xl opacity-50 blur-sm'></div>
                                </div>

                                {/* Seconds */}
                                <div className='relative group'>
                                    <div className='bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg transform group-hover:scale-105 transition-transform animate-pulse'>
                                        <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white'>
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </h2>
                                        <h4 className='font-semibold text-xs md:text-sm text-orange-100 mt-1'>Secs</h4>
                                    </div>
                                    <div className='absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-b-xl opacity-50 blur-sm'></div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
                            <Link to="/shop">
                                <button className='group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto'>
                                    <span className='relative z-10'>View All Products</span>
                                    <FaCircleArrowRight className='relative z-10 group-hover:translate-x-1 transition-transform text-xl' />
                                </button>
                            </Link>
                            
                            <button className='inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 w-full sm:w-auto'>
                                Learn More
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-gray-600'>
                            <div className='flex items-center gap-2'>
                                <div className='w-5 h-5 bg-green-100 rounded-full flex items-center justify-center'>
                                    <span className='text-green-600'>✓</span>
                                </div>
                                <span>Free Shipping</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <span className='text-blue-600'>✓</span>
                                </div>
                                <span>Easy Returns</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center'>
                                    <span className='text-purple-600'>✓</span>
                                </div>
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className='flex-1 w-full max-w-md lg:max-w-none'>
                        <div className='relative'>
                            {/* Decorative circle behind image */}
                            <div className='absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full transform scale-90 blur-3xl opacity-20'></div>
                            
                            {/* Image container with floating effect */}
                            <div className='relative z-10 transform hover:scale-105 transition-transform duration-500'>
                                <img 
                                    src={womanImage} 
                                    alt="Monthly deals woman shopping" 
                                    className='w-full h-auto drop-shadow-2xl'
                                />
                            </div>

                            {/* Floating discount badge */}
                            <div className='hidden md:block absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-2xl animate-float border-4 border-orange-500'>
                                <div className='text-center'>
                                    <div className='text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
                                        60%
                                    </div>
                                    <div className='text-sm font-semibold text-gray-700'>OFF</div>
                                </div>
                            </div>

                            {/* Floating products count */}
                            <div className='hidden md:block absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-2xl animate-float' style={{ animationDelay: '0.5s' }}>
                                <div className='flex items-center gap-3'>
                                    <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
                                        <span className='text-2xl'>🛍️</span>
                                    </div>
                                    <div>
                                        <div className='font-bold text-gray-900'>500+</div>
                                        <div className='text-sm text-gray-600'>Products</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default OfferMonthly;