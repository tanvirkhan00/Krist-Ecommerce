import React from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { CiHeadphones } from 'react-icons/ci';
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from 'react-icons/md';


const OurService = () => {
    return (
        <>

            <section>
                <div className="container mt-[50px]">
                    <div className='flex items-center flex-wrap gap-3'>
                        <div className='basis-[24%] p-8 flex flex-col gap-2 btnHover truncate'>
                            <span className='text-[30px]'><FaShippingFast /></span>
                            <h2 className='font-bold text-[25px]'>Free Shipping</h2>
                            <p className='text-slate-400'>Free shipping for order above $150</p>
                        </div>
                        <div className='basis-[24%] p-8 flex flex-col gap-2 btnHover truncate'>
                            <span className='text-[30px]'><AiOutlineDollar /></span>
                            <h2 className='font-bold text-[25px]'>Money Guarantee</h2>
                            <p className='text-slate-400'>Within 30 days for an exchange</p>
                        </div>
                        <div className='basis-[24%] p-8 flex flex-col gap-2 btnHover truncate'>
                            <span className='text-[30px]'><CiHeadphones /></span>
                            <h2 className='font-bold text-[25px]'>Online Support</h2>
                            <p className='text-slate-400'>24 hours a day, 7 days a week</p>
                        </div>
                        <div className='basis-[24%] p-8 flex flex-col gap-2 btnHover truncate'>
                            <span className='text-[30px]'><MdOutlinePayment /></span>
                            <h2 className='font-bold text-[25px]'>Flexible Payment</h2>
                            <p className='text-slate-400'>Pay with multiple credit cards</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default OurService;