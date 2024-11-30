import React from 'react';

// Image
import Image from "../assets/Image3.png"

// Icons
import { LuChevronLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const OtpSection = () => {
    return (
        <>
            
            <section>
                <div className="container mt-[150px]">
                    <div className='flex items-center gap-10 flex-wrap'>
                        <div className='basis-[50%]'>
                            <img src={Image} alt="" />
                        </div>
                        <div className='basis-[35%] flex flex-col gap-3'>
                            <p className='flex items-center gap-1'><LuChevronLeft /><Link to="/login">Back</Link> </p>
                            <p className='text-[30px] font-bold'>Enter OTP</p>
                            <p className='text-slate-600'>We have share a code of your registered email address kmtainvir@gmail.com</p>
                            <form className='flex gap-2'>
                                <input className='border-2 border-slate-300 rounded-md w-[50px] py-2 px-2 outline-none borderHover' type="number" />
                                <input className='border-2 border-slate-300 rounded-md w-[50px] py-2 px-2 outline-none borderHover' type="number" />
                            </form>
                            <button className='border-2 border-black py-2 rounded-md btnHover mt-3'><Link to="/login">Verify</Link></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OtpSection;