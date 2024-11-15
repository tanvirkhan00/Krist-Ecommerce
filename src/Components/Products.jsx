import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';

const Products = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])

    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    })


    return (
        <>

            <section>
                <div className="container">
                    <div className='flex flex-wrap gap-3'>
                        <div className='basis-[20%]'>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Product Category</h1>
                                <div className='mt-4 flex flex-col gap-2 h-0 overflow-y-scroll opacity-0 invisible -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-[300px]'>
                                    {category.map((item, index) => (
                                        <div className='flex items-center gap-2'>
                                            <input id={`category-${index}`} type="checkbox" />
                                            <label htmlFor={`category-${index}`}>{item}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Price</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div>
                                        <p>Price: $0 - $200000</p>

                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Color</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-red-500 rounded-md'></span>
                                            <h5>Red</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-blue-500 rounded-md'></span>
                                            <h5>Blue</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-orange-500 rounded-md'></span>
                                            <h5>Orange</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-black rounded-md'></span>
                                            <h5>Black</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-green-500 rounded-md'></span>
                                            <h5>Green</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-yellow-500 rounded-md'></span>
                                            <h5>Yellow</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Size</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="s" type="checkbox" />
                                            <label htmlFor="s">S</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="m" type="checkbox" />
                                            <label htmlFor="m">M</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="l" type="checkbox" />
                                            <label htmlFor="l">L</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xl" type="checkbox" />
                                            <label htmlFor="xl">XL</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xxl" type="checkbox" />
                                            <label htmlFor="xxl">XXL</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xxxl" type="checkbox" />
                                            <label htmlFor="xxxl">XXXL</label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basis-[70%]'>

                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Products;