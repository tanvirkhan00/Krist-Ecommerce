import React from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';

// Image
import womanImage from "../assets/womanShoping2.png"

const OfferMonthly = () => {
    return (
        <>

            <section>
                <div className="container mt-[50px]">
                    <div className='flex flex-wrap items-center gap-4'>
                        <div className='basis-[48%] flex flex-col gap-4'>
                            <h1 className='text-[35px] font-semibold'>Deals of the Month</h1>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at it's layout. The point of using that it has more or less normal distribution of letters.</p>
                            <div className='flex items-center gap-8 text-center'>
                                <div>
                                    <h2 className='font-bold text-[40px]'>120</h2>
                                    <h4 className='font-semibold'>Days</h4>
                                </div>
                                <div>
                                    <h2 className='font-bold text-[40px]'>18</h2>
                                    <h4 className='font-semibold'>Hours</h4>
                                </div>
                                <div>
                                    <h2 className='font-bold text-[40px]'>15</h2>
                                    <h4 className='font-semibold'>Mins</h4>
                                </div>
                                <div>
                                    <h2 className='font-bold text-[40px]'>10</h2>
                                    <h4 className='font-semibold'>Secs</h4>
                                </div>
                            </div>
                            <button className='flex items-center gap-2 border-2 border-black rounded-md max-w-fit px-6 py-4 font-semibold btnHover'>View All Products <span><FaCircleArrowRight/></span></button>
                        </div>
                        <div className='basis-[48%]'>
                            <img src={womanImage} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default OfferMonthly;