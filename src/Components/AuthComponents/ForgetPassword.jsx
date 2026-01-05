import React from 'react';
import { Link } from 'react-router-dom';

// Image
import Image2 from "../../assets/Image2.png"

// Icons
import { LuChevronLeft } from 'react-icons/lu';

const ForgetPassword = () => {
    return (
        <>

            <section>
                <div className="container mt-[150px]">
                    <div className='flex items-center flex-wrap gap-12'>
                        <div className='basis-[48%]'>
                            <img src={Image2} alt="" />
                        </div>
                        <div className='basis-[35%] flex flex-col gap-3'>
                            <p className='flex items-center gap-1'><LuChevronLeft /><Link to="/login">Back</Link> </p>
                            <p className='text-[30px] font-bold'>Forget Password</p>
                            <p className='text-slate-600'>Enter your registered email address, we'll send you a code to reset your password</p>
                            <form className='flex flex-col gap-2'>
                                <label htmlFor="email">Email Address</label>
                                <input className='border-2 border-slate-300 rounded-md  py-2 px-2 outline-none borderHover' type="email" placeholder='kmtanvir111@gmail.com' />
                            </form>
                            <button className='border-2 border-black py-2 rounded-md btnHover mt-3'><Link to="/otp">Send OTP</Link></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgetPassword;