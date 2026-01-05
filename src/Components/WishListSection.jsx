import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteWishProduct } from './Slice/productSlice';

// Icons
import { GoTrash } from 'react-icons/go';

const WishListSection = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // WishList 
    let WishListItem = useSelector((state) => state.product.WishListItem)
    let handleSingleItem = (itemId) => {
        navigate(`/product/${itemId.id}`)
    }
    let handleTrash = (trash) => {
        dispatch(deleteWishProduct(trash))
    }

    return (
        <>

            <section>
                <div className="container mt-[150px]">
                    <div>
                        <h1 className='text-[30px] font-serif font-semibold'>Wishlist Product <span className='text-red-500'>[{WishListItem.length}]</span></h1>
                        <div className='mt-5'>
                            <div className='basis-[65%] flex flex-col gap-4'>
                                <ul className='flex gap-2 items-center shadow-md shadow-blue-500 py-2'>
                                    <li className='basis-[45%] text-center'>Products</li>
                                    <li className='basis-[10%]'>Price</li>
                                    <li className='basis-[20%]'>Brand</li>
                                    <li className='basis-[10%] text-end'>Category</li>
                                </ul>
                                <ul className='flex flex-col gap-3'>
                                    {WishListItem.map((item, index) => (
                                        <li>
                                            <div className='flex items-center gap-2 relative group shadow-sm shadow-black'>
                                                <div onClick={() => handleSingleItem(item)} className='basis-[45%] flex items-center gap-2 cursor-pointer'>
                                                    <img className='w-[60px] h-[60px]' src={item.thumbnail} alt="" />
                                                    <h3>{item.title}</h3>
                                                </div>
                                                <span className='basis-[10%]'>$ {item.price}</span>
                                                <div className='basis-[20%]'>
                                                    <span>{item.brand}</span>
                                                </div>
                                                <div className='basis-[10%] text-end'>
                                                    <span className='text-end'>{item.category} </span>
                                                </div>
                                                <span onClick={() => handleTrash(index)} className='absolute right-0 mr-3 opacity-0 -translate-y-2 duration-700 ease-in-out cursor-pointer group-hover:opacity-100 group-hover:-translate-y-0 hover:text-red-500 hover:scale-110'><GoTrash /></span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default WishListSection;