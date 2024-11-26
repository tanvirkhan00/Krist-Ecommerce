import React from 'react';
import { useSelector } from 'react-redux';

const CheckOutComponent = () => {

    let cartData = useSelector((state) => state.product.CartItem)

    return (
        <>
            <section>
                <div className="container mt-[100px]">
                    <div>
                        <h1 className='font-semibold text-[30px]'>CheckOut</h1>
                        <div className='flex gap-2 mt-5'>
                            <div className='basis-[70%]'>
                                <ul className='flex items-center'>
                                    <li className='basis-[50%]'>Products</li>
                                    <li className='basis-[10%]'>Price</li>
                                    <li className='basis-[20%]'>Quantity</li>
                                    <li className='basis-[10%]'>Subtotal</li>
                                </ul>
                                <ul>
                                    {cartData.map((item) => (
                                        <li>
                                            <div className='flex items-center'>
                                                <div className='basis-[50%] flex items-center gap-2'>
                                                    <img className='w-[60px] h-[60px]' src={item.thumbnail} alt="" />
                                                    <h3>{item.title}</h3>
                                                </div>
                                                <span className='basis-[10%]'>{item.price}</span>
                                                <div className='basis-[20%]'>
                                                    <span>-</span>
                                                    <span>{item.qty}</span>
                                                    <span>+</span>
                                                </div>
                                                <div className='basis-[10%]'>{(item.price)*(item.qty)}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='basis-[25%]'></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckOutComponent;