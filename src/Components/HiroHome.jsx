import React from 'react';

// Icons
import { FiArrowRight } from "react-icons/fi";

// Image
import woman from "../assets/womanShoping.png"


const HiroHome = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='flex items-center flex-wrap gap-4'>
                        <div className='basis-[47%] flex flex-col gap-3'>
                            <h3 className='font-semibold text-[25px]'>Classic Exclusive</h3>
                            <h1 className='text-[45px] font-bold font-serif text-blue-500'>Woman's Collection</h1>
                            <p className='font-semibold text-[25px]'>Upto 40% Off</p>
                            <button className='flex items-center gap-2 border-2 border-black py-2 px-5 max-w-fit btnHover rounded-md'>Shop Now <span><FiArrowRight/></span></button>
                        </div>
                        <div className='basis-[47%]'>
                            <img src={woman} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HiroHome;