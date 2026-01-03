import React, { useContext, useEffect, useState } from 'react';
import { apiData } from '../Components/ContextApi';
import { useNavigate } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';

const ShopByCategory = () => {
    let products = useContext(apiData);
    const [categoryData, setCategoryData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const categoriesWithImages = [
            ...new Map(
                products.map((item) => [item.category, item.thumbnail])
            ).entries()
        ].map(([category, thumbnail]) => ({ category, thumbnail }));

        setCategoryData(categoriesWithImages);
    }, [products]);

    let handleCategory = (item) => {
        navigate(`/category/${item.category}`);
    };

    return (
        <section className='relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 lg:py-24 overflow-hidden'>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center gap-6 mb-10 md:mb-14'>
                    <div className='text-center sm:text-left'>
                        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
                            Shop by Category
                        </h2>
                        <p className='text-gray-600 text-base md:text-lg'>
                            Explore our diverse collection tailored just for you
                        </p>
                    </div>
                    <button className='hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group'>
                        View All Categories
                        <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>

                {/* Categories Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
                    {categoryData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleCategory(item)}
                            className='group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100'
                        >
                            {/* Hover Gradient Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300'></div>

                            {/* Content */}
                            <div className='relative flex flex-col items-center justify-center p-4 md:p-6 space-y-3 md:space-y-4'>
                                {/* Image Container */}
                                <div className='relative w-full aspect-square flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden group-hover:bg-gray-100 transition-colors'>
                                    <img
                                        className='h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain transform group-hover:scale-110 transition-transform duration-300'
                                        src={item.thumbnail}
                                        alt={item.category}
                                        loading="lazy"
                                    />

                                    {/* Hover Icon */}
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300'>
                                        <FiArrowRight className='text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-xl' />
                                    </div>
                                </div>

                                {/* Category Name */}
                                <div className='w-full'>
                                    <p className='text-sm md:text-base font-semibold text-gray-800 truncate text-center group-hover:text-blue-600 transition-colors capitalize'>
                                        {item.category}
                                    </p>
                                    <p className='text-xs text-gray-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        Explore now
                                    </p>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className='absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300'></div>
                        </div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className='sm:hidden flex justify-center mt-8'>
                    <button className='flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors'>
                        View All Categories
                        <FiArrowRight />
                    </button>
                </div>

                {/* Bottom Stats Section */}
                <div className='mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
                    <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>{categoryData.length}+</div>
                        <div className='text-sm md:text-base text-gray-600 mt-1'>Categories</div>
                    </div>
                    <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>500+</div>
                        <div className='text-sm md:text-base text-gray-600 mt-1'>Products</div>
                    </div>
                    <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>24/7</div>
                        <div className='text-sm md:text-base text-gray-600 mt-1'>Support</div>
                    </div>
                    <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>Free</div>
                        <div className='text-sm md:text-base text-gray-600 mt-1'>Shipping</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;