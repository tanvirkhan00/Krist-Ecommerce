import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const CategoryItem = () => {

    const product = useContext(apiData)
    const { categoryName } = useParams()

    const categoryItem = product.filter((item) => item.category === categoryName)

    if (!categoryItem) {
        return <p className='text-center pt-5'>Please Wait ....</p>
    }


    return (
        <>
            <section>
                <div className="container mt-[50px]">
                    <div className="flex flex-wrap gap-4">
                        {categoryItem.length > 0 ? (
                            <div className='flex flex-wrap gap-7'>
                                {categoryItem.map(item => (
                                    <div className='basis-[18%] flex flex-col gap-3 shadow-sm shadow-black pb-2'>
                                    <div className='bg-slate-300 relative group'>
                                        <Link to={`/product/${item.id}`}><img className='h-[150px] w-[150px] mx-auto' src={item.thumbnail} alt={item.title} /></Link>
                                        <div className='bg-yellow-500 absolute bottom-0 w-full py-1 text-sm font-semibold  opacity-0 duration-700 translate-y-3 ease-in-out group-hover:opacity-100 group-hover:translate-y-0'>
                                            <p className='text-center cursor-pointer'>Add To Cart</p>
                                        </div>
                                        <div className='absolute top-0 right-0 flex flex-col gap-3 p-5 opacity-0 -translate-y-5 duration-700 ease-in-out group-hover:opacity-100   group-hover:-translate-y-0'>
                                            <span className='bg-white cursor-pointer p-1 rounded-full text-[20px] duration-500 ease-in-out hover:scale-110 hover:text-red-500'><CiHeart /></span>
                                            <span className='bg-white cursor-pointer p-1 rounded-full text-[20px] duration-500 ease-in-out hover:scale-110 hover:text-red-500'><IoEyeOutline /></span>
                                        </div>
                                    </div>
                                    <div className='px-3'>
                                        <h1 className='font-semibold w-[200px] truncate'>{item.title}</h1>
                                        <h2>{item.category}</h2>
                                        <h5>$ {item.price}</h5>
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No items found for this category.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryItem;