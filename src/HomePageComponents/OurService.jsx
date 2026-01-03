import React from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { CiHeadphones } from 'react-icons/ci';
import { FaShippingFast, FaCheckCircle } from "react-icons/fa";
import { MdOutlinePayment } from 'react-icons/md';

const OurService = () => {
    const services = [
        {
            icon: <FaShippingFast />,
            title: "Free Shipping",
            description: "Free shipping for order above $150",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            iconBg: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            icon: <AiOutlineDollar />,
            title: "Money Guarantee",
            description: "Within 30 days for an exchange",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
            iconBg: "bg-green-100",
            textColor: "text-green-600"
        },
        {
            icon: <CiHeadphones />,
            title: "Online Support",
            description: "24 hours a day, 7 days a week",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
            iconBg: "bg-purple-100",
            textColor: "text-purple-600"
        },
        {
            icon: <MdOutlinePayment />,
            title: "Flexible Payment",
            description: "Pay with multiple credit cards",
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-50",
            iconBg: "bg-orange-100",
            textColor: "text-orange-600"
        }
    ];

    return (
        <section className='relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white'>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <FaCheckCircle />
                        Why Choose Us
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our Premium
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Services
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We provide exceptional services to ensure the best shopping experience
                    </p>
                </div>

                {/* Services Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className='group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2'
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                            
                            {/* Content */}
                            <div className='relative space-y-4'>
                                {/* Icon Container */}
                                <div className='relative'>
                                    <div className={`w-16 h-16 md:w-20 md:h-20 ${service.iconBg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                                        <span className={`text-3xl md:text-4xl ${service.textColor}`}>
                                            {service.icon}
                                        </span>
                                    </div>
                                    
                                    {/* Floating Badge */}
                                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
                                        <FaCheckCircle className='text-white text-xs' />
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className='font-bold text-xl md:text-2xl text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                                    {service.title}
                                </h2>

                                {/* Description */}
                                <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
                                    {service.description}
                                </p>

                                {/* Decorative Line */}
                                <div className='pt-2'>
                                    <div className={`h-1 bg-gradient-to-r ${service.color} rounded-full w-0 group-hover:w-full transition-all duration-500`}></div>
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300`}></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats Section */}
                <div className='mt-16 md:mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
                        <div className='text-center'>
                            <div className='text-4xl md:text-5xl font-bold mb-2'>10K+</div>
                            <div className='text-blue-100 text-sm md:text-base'>Happy Customers</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-4xl md:text-5xl font-bold mb-2'>500+</div>
                            <div className='text-blue-100 text-sm md:text-base'>Products</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-4xl md:text-5xl font-bold mb-2'>24/7</div>
                            <div className='text-blue-100 text-sm md:text-base'>Support</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-4xl md:text-5xl font-bold mb-2'>98%</div>
                            <div className='text-blue-100 text-sm md:text-base'>Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Additional Features */}
                <div className='mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100'>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <span className='text-2xl'>🔒</span>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 mb-1'>Secure Shopping</h3>
                            <p className='text-sm text-gray-600'>Your data is protected with SSL encryption</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100'>
                        <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <span className='text-2xl'>⚡</span>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 mb-1'>Fast Delivery</h3>
                            <p className='text-sm text-gray-600'>Express shipping available worldwide</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100'>
                        <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <span className='text-2xl'>💎</span>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 mb-1'>Premium Quality</h3>
                            <p className='text-sm text-gray-600'>Only the best products for our customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurService;