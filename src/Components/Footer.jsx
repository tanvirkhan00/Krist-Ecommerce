import React from 'react';

// Image
import title from "../assets/Logo.png";
import title1 from "../assets/KLogo.png";

// Icons
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { LiaCcVisa } from "react-icons/lia";
import { SiApplepay } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { BsPaypal } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>

            <footer className='bg-black'>
                <div className="container mt-[50px]">
                    <div className='flex flex-wrap gap-5 text-white py-[50px]'>
                        <div className='basis-[23%] flex flex-col gap-6'>
                            <div className='flex items-center gap-2'>
                                <img className='h-[50px] ' src={title1} alt="" />
                                <img className='h-[50px]' src={title} alt="" />
                            </div>
                            <div className='flex flex-col gap-2 text-[20px]'>
                                <p className='flex items-center gap-2'><span><MdOutlinePhoneInTalk /></span>+880 1959-948542</p>
                                <p className='flex items-center gap-2'><span><HiOutlineMail /></span>krist@gmail.com</p>
                                <p className='flex items-center gap-2'><span><IoLocationOutline /></span>Dhanmondi, Dhaka</p>
                            </div>
                        </div>
                        <div className='basis-[23%] flex flex-col gap-4'>
                            <h1 className='font-semibold text-[25px]'>Information</h1>
                            <ul className='flex flex-col gap-2 text-slate-400'>
                                <li>My Account</li>
                                <li><Link to="/login">Login</Link></li>
                                <li>My Cart</li>
                                <li><Link to="/wishList">My Wishlist</Link></li>
                                <li>CheckOut</li>
                            </ul>
                        </div>
                        <div className='basis-[23%] flex flex-col gap-4'>
                            <h2 className='font-semibold text-[25px]'>Service</h2>
                            <ul className='flex flex-col gap-2 text-slate-400'>
                                <li>About Us</li>
                                <li>Careers</li>
                                <li>Delivery Information</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Condition</li>
                            </ul>
                        </div>
                        <div className='basis-[23%] flex flex-col gap-4'>
                            <h1 className='font-semibold text-[25px]'>Subscribe</h1>
                            <p>Enter your email below to be the first to know about new collections and product launches.</p>
                            <div className='flex items-center justify-between border-2 border-white p-3 rounded-sm btnHover text-[20px] gap-2'>
                                <span className='text-[30px] animate-bounce text-green-500'><HiOutlineMail/></span>
                                <input className='bg-transparent outline-none' type="text" placeholder='Your Email' />
                                <span><FaRegArrowAltCircleRight /></span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='border-t-2  border-slate-300 py-3'>
                    <div className="container  flex items-center justify-between">
                        <div className='flex text-white items-center gap-4 text-[35px]'>
                            <span><LiaCcVisa /></span>
                            <span><SiApplepay/></span>
                            <span><FaGooglePay/></span>
                            <span><LiaCcAmex/></span>
                            <span><BsPaypal/></span>
                        </div>
                        <div>
                            <p className='text-slate-300 font-semibold'>@ 2023 Krist All right are reserved</p>
                        </div>
                        <div className='flex items-center text-white gap-5 text-[25px]'>
                            <span><FaFacebookSquare/></span>
                            <span><LuInstagram/></span>
                            <span><FaTwitter/></span>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;