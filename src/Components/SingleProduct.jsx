import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { apiData } from './ContextApi';
import RelatedProducts from './RelatedProducts';
import { useDispatch } from 'react-redux';
import TabVar from './TabVar';

// Icons
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { addToCart, WishList } from './Slice/productSlice';
import { getAuth } from 'firebase/auth';



const SingleProduct = () => {

    let products = useContext(apiData)
    const { id } = useParams()
    const dispatch = useDispatch()

    // If products haven't loaded yet, show a loading message
    if (!products || products.length === 0) {
        return <p className='text-center py-10'>Loading...</p>;
    }

    // Find the product based on the ID from the URL
    const product = products.find((item) => item.id === parseInt(id));

    // Handle case where the product is not found
    if (!product) {
        return <p className='text-center py-10'>Product not found!</p>;
    }

    let filterCategory = products.filter((item) => item.category === product.category)

    // Add Cart
    let handleCart = (itemId) => {
        const auth = getAuth()
        const user = auth.currentUser


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
                <div className="container mt-[100px]">
                    <div className='flex items-center gap-4'>
                        <div className='basis-[47%] flex items-center justify-center'>
                            <img src={product.thumbnail} alt={product.title} />
                        </div>
                        <div className='basis-[47%] flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-semibold text-[25px]'>{product.title}</h1>
                                <span className='text-green-600'>{product.availabilityStatus}</span>
                            </div>
                            <p>{product.description}</p>
                            <p className='font-semibold text-red-500'>${product.price}</p>
                            <div className='flex items-center gap-2'>
                                <p className=' font-semibold text-[20px]'>Stock: </p>
                                <span>{product.stock}</span>
                            </div>
                            <div className='flex items-center gap-2 text-yellow-400 text-[20px]'>
                                <span><FaStar /></span>
                                <span><FaStar /></span>
                                <span><FaStar /></span>
                                <span><FaStar /></span>
                                <span><FaStar /></span>
                                <span className='text-red-500'>({product.rating})</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className=' font-semibold text-[20px]'>Brand: </p>
                                <span>{product.brand}</span>
                            </div>
                            <div>
                                <p className='font-semibold text-[20px]'>Color:</p>
                                <div className='flex items-center gap-2 '>
                                    <input type="color" />
                                    <input type="color" />
                                    <input type="color" />
                                    <input type="color" />
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold text-[20px]'>Size:</p>
                                <div className='flex items-center gap-2'>
                                    <span className='border-2 border-black px-2 text-red-500 rounded-md'>XXL</span>
                                    <span className='border-2 border-black px-2 text-red-500 rounded-md'>XL</span>
                                    <span className='border-2 border-black px-2 text-red-500 rounded-md'>L</span>
                                    <span className='border-2 border-black px-2 text-red-500 rounded-md'>M</span>
                                </div>
                            </div>
                            <div className='mt-2 flex items-center gap-5'>
                                <button onClick={() => handleCart(product)} className='border-2 border-black px-14 py-3 rounded-sm btnHover'>Add To Cart</button>
                                <span onClick={() => handleWishList(product)} className='text-[25px] border-2 border-black p-2 rounded-md duration-700 ease-in-out hover:scale-110 hover:text-red-500'><CiHeart /></span>
                            </div>
                            <div className='flex gap-5 mt-3'>
                                <p className='border-2 border-black rounded-md px-5 py-3 text-red-500'>{product.warrantyInformation}</p>
                                <p className='border-2 border-black rounded-md px-5 py-3 text-red-500'>{product.returnPolicy} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <TabVar />
            <RelatedProducts filterCategory={filterCategory} />

        </>
    );
};

export default SingleProduct;