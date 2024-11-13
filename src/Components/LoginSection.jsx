import React from 'react';

// Image
import title from "../assets/LogoWebsite.png";
import image from "../assets/Image.png";

// Icons
import { FaHandSparkles } from "react-icons/fa";


const LoginSection = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='flex items-center flex-wrap gap-10'>
                        <div className='md:basis-[60%] relative'>
                            <img className='absolute top-10 left-10' src={title} alt="" />
                            <img className='w-full h-[700px]' src={image} alt="" />
                        </div>
                        <div className='md:basis-[30%] flex flex-col gap-3'>
                            <h1 className='flex items-center gap-2 text-[45px] font-bold font-serif'>Welcome <span className='text-yellow-400'><FaHandSparkles/></span></h1>
                            <p className='text-slate-500'>Please login here</p>
                            <form className='flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="email">Email Address</label>
                                    <input className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none' type="email" placeholder='abje@gmail.com' />
                                </div>
                                <div className='flex  flex-col'>
                                    <label htmlFor="pass">Password</label>
                                    <input className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none' type="password" />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" id='pass' />
                                        <label id='pass'>Remember Me</label>
                                    </div>
                                    <p>Forget Password?</p>
                                </div>
                                <button className='border-black border-2 rounded-md py-2 text-[20px] font-semibold btn-hover'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default LoginSection;