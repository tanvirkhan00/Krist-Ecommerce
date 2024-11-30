import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Decrement, deletProduct, Increment } from './Slice/productSlice';

// Icons
import { FiMinus, FiPlus } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';

const CheckOutComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let cartData = useSelector((state) => state.product.CartItem)

    let handleSingleItem = (itemId) => {
        navigate(`/product/${itemId.id}`)
    }
    let handleTrash = (trash) => {
        dispatch(deletProduct(trash))
    }

    let total = cartData.reduce((acc, curr) => (acc + (curr.price * curr.qty)), 0)

    // Discount 
    const deliveryCharge = 5.00;
    const grandTotal = total + deliveryCharge;

    // DeCrement 
    const handleDecrement = (itemId) => {
        dispatch(Decrement(itemId))
    }
    
    // Increment
    const handleIncrement =(itemId) => {
        dispatch(Increment(itemId))
    }

    return (
        <>
            <section>
                <div className="container mt-[100px]">
                    <div>
                        <h1 className='font-semibold text-[30px]'>CheckOut</h1>
                        <div className='flex flex-wrap justify-between gap-5 mt-5'>
                            <div className='basis-[65%] flex flex-col gap-4'>
                                <ul className='flex gap-2 items-center shadow-md shadow-blue-500 py-2'>
                                    <li className='basis-[45%] text-center'>Products</li>
                                    <li className='basis-[10%]'>Price</li>
                                    <li className='basis-[20%]'>Quantity</li>
                                    <li className='basis-[10%] text-end'>Subtotal</li>
                                </ul>
                                <ul className='flex flex-col gap-3'>
                                    {cartData.map((item, index) => (
                                        <li>
                                            <div className='flex items-center gap-2 relative group shadow-sm shadow-black'>
                                                <div onClick={() => handleSingleItem(item)} className='basis-[45%] flex items-center gap-2 cursor-pointer'>
                                                    <img className='w-[60px] h-[60px]' src={item.thumbnail} alt="" />
                                                    <h3>{item.title}</h3>
                                                </div>
                                                <span className='basis-[10%]'>$ {item.price}</span>
                                                <div className='basis-[20%]'>
                                                    <div className='border-2 max-w-fit flex items-center gap-5 py-1 px-2'>
                                                        <span onClick={() => handleDecrement(index)}><FiMinus /></span>
                                                        <span>{item.qty}</span>
                                                        <span onClick={() => handleIncrement(index)}><FiPlus /></span>
                                                    </div>
                                                </div>
                                                <div className='basis-[10%] text-end'>
                                                    <span className='text-end'>$ {((item.price) * (item.qty)).toFixed(2)}</span>
                                                </div>
                                                <span onClick={() => handleTrash(index)} className='absolute right-0 mr-3 opacity-0 -translate-y-2 duration-700 ease-in-out cursor-pointer group-hover:opacity-100 group-hover:-translate-y-0 hover:text-red-500 hover:scale-110'><GoTrash /></span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='basis-[25%]'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center font-bold justify-between text-[25px]'>
                                        <h1 className=''>Subtotal</h1>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <p className='text-[14px]'>Enter Discount Code</p>
                                    <div className='flex items-center justify-between border-2 border-black rounded-md'>
                                        <input className='outline-none px-2' type="text" />
                                        <button className='bg-black text-white w-[100px] h-[50px]'>Apply</button>
                                    </div>
                                    <div className='flex items-center justify-between '>
                                        <p>Delivery Charge</p>
                                        <span>$ {deliveryCharge}.00</span>
                                    </div>
                                    <div className='flex items-center justify-between font-bold text-[20px]'>
                                        <p className=''>Grand Total</p>
                                        <span>{grandTotal.toFixed(2)}</span>
                                    </div>
                                    <button className='border-2 border-slate-400 w-full rounded-md py-3 btnHover'>Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckOutComponent;