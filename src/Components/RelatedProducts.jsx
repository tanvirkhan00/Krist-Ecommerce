import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addToCart, WishList } from './Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";


const RelatedProducts = ({ filterCategory }) => {
    const dispatch = useDispatch()


    // Import Account
    let account = useSelector((state) => state.product.Account)
    // Add Cart
    let handleCart = (itemId) => {
        let auth = getAuth()
        let user = auth.currentUser

        if (!user) {
            alert("Please Create Account")
        } else if (user.emailVerified == false) {
            alert("Please Verify Gmail")
        } else {
            dispatch(addToCart({ ...itemId, qty: 1 }))
        }
    }

    // WishList 
    let handleWishList = (itemId) => {
        dispatch(WishList({ ...itemId, qty: 1 }))
    }

    return (
        <>

            <section>
                <div className="container mt-10">
                    <div className=''>
                        <div>
                            <p className='text-[30px] font-semibold flex items-center gap-4'> <span className='w-[20px] h-[30px] bg-red-500'></span>Related Products</p>
                        </div>
                        <div className='flex flex-wrap gap-x-3 gap-y-5 mt-5'>
                            {filterCategory.map((item) => (
                                <div className='basis-[19%] flex flex-col gap-3 shadow-sm shadow-black pb-2'>
                                    <div className='bg-slate-300 relative group'>
                                        <Link to={`/product/${item.id}`}><img className='h-[150px] w-[150px] mx-auto' src={item.thumbnail} alt={item.title} /></Link>
                                        <div className='bg-yellow-500 absolute bottom-0 w-full py-1 text-sm font-semibold  opacity-0 duration-700 translate-y-3 ease-in-out group-hover:opacity-100 group-hover:translate-y-0'>
                                            <p onClick={() => handleCart(item)} className='text-center cursor-pointer'>Add To Cart</p>
                                        </div>
                                        <div className='absolute top-0 right-0 flex flex-col gap-3 p-5 opacity-0 -translate-y-5 duration-700 ease-in-out group-hover:opacity-100   group-hover:-translate-y-0'>
                                            <span onClick={() => handleWishList(item)} className='bg-white cursor-pointer p-1 rounded-full text-[20px] duration-500 ease-in-out hover:scale-110 hover:text-red-500'><CiHeart /></span>
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
                    </div>
                </div>
            </section>

        </>
    );
};

export default RelatedProducts;