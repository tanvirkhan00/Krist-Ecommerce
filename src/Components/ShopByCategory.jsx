import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { useNavigate } from 'react-router';

const ShopByCategory = () => {

    let products = useContext(apiData)
    const [categoryData, setCategoryData] = useState([]);
    let navigate =useNavigate()

    useEffect(() => {
        const categoriesWithImages =[
            ...new Map(
                products.map((item) => [item.category, item.thumbnail])
            ).entries()
        ].map(([category, thumbnail]) => ({category, thumbnail}));

        setCategoryData(categoriesWithImages)
    },[products])
    
    let handleCategory =(item) => {
        navigate(`/category/${item.category}`);
    }

    return (
        <>

            <section className='bg-gray-100 py-14'>
                <div className="container">
                    <div className='flex flex-col gap-3'>
                        <div>
                            <h1 className='text-[25px] font-semibold'>Shop by Category</h1>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {categoryData.map((item) => (
                                <div onClick={() =>handleCategory(item)} className='basis-[9%] flex flex-col shadow-sm shadow-black items-center text-center py-3 rounded-sm upScallHover'>
                                    <img className='h-[60px] md:h-[80px]' src={item.thumbnail} alt="" />
                                    <p className='w-[80px] truncate px-1'>{item.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ShopByCategory;