import React, { useState } from 'react';

// Image
import title from "../assets/Logo.png";
import title1 from "../assets/KLogo.png";

// Icons
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline, IoArrowForward } from 'react-icons/io5';
import { FaRegArrowAltCircleRight, FaCheck } from 'react-icons/fa';
import { LiaCcVisa, LiaCcAmex } from "react-icons/lia";
import { SiApplepay } from "react-icons/si";
import { FaGooglePay, FaFacebookSquare, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <footer className='relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden'>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-12 md:py-16 lg:py-20'>
                    
                    {/* Company Info */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center gap-3'>
                            <img className='h-10 md:h-12 hover:scale-110 transition-transform duration-300' src={title1} alt="Logo" />
                            <img className='h-10 md:h-12 hover:scale-110 transition-transform duration-300' src={title} alt="Brand" />
                        </div>
                        
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Your trusted destination for premium fashion and lifestyle products. Quality guaranteed.
                        </p>

                        <div className='flex flex-col gap-3 text-sm md:text-base'>
                            <a href="tel:+8801959948542" className='flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group'>
                                <span className='w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center group-hover:bg-blue-600/30 transition-colors'>
                                    <MdOutlinePhoneInTalk className='text-blue-400' />
                                </span>
                                <span>+880 1959-948542</span>
                            </a>
                            <a href="mailto:krist@gmail.com" className='flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group'>
                                <span className='w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/30 transition-colors'>
                                    <HiOutlineMail className='text-purple-400' />
                                </span>
                                <span>kmtanvir1111@gmail.com</span>
                            </a>
                            <div className='flex items-center gap-3 text-gray-300 group'>
                                <span className='w-10 h-10 bg-pink-600/20 rounded-full flex items-center justify-center group-hover:bg-pink-600/30 transition-colors'>
                                    <IoLocationOutline className='text-pink-400' />
                                </span>
                                <span>Banasree, Rampura, Dhaka</span>
                            </div>
                        </div>
                    </div>

                    {/* Information Links */}
                    <div className='flex flex-col gap-6'>
                        <h3 className='text-xl md:text-2xl font-bold relative inline-block'>
                            Information
                            <span className='absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></span>
                        </h3>
                        <ul className='flex flex-col gap-3'>
                            {[
                                { name: 'My Account', path: '#' },
                                { name: 'Login', path: '/login' },
                                { name: 'My Cart', path: '/cartPage' },
                                { name: 'My Wishlist', path: '/wishList' },
                                { name: 'Checkout', path: '#' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className='text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group'
                                    >
                                        <IoArrowForward className='opacity-0 group-hover:opacity-100 transition-opacity text-blue-400' />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className='flex flex-col gap-6'>
                        <h3 className='text-xl md:text-2xl font-bold relative inline-block'>
                            Newsletter
                            <span className='absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></span>
                        </h3>
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Subscribe to get special offers, free giveaways, and exclusive deals.
                        </p>
                        
                        <form onSubmit={handleSubscribe} className='relative'>
                            {!subscribed ? (
                                <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1.5 border border-white/20 hover:border-blue-400 transition-colors group'>
                                    <HiOutlineMail className='text-gray-400 ml-3 text-xl' />
                                    <input
                                        className='flex-1 bg-transparent outline-none px-3 py-2 text-white placeholder-gray-400 text-sm'
                                        type="email"
                                        placeholder='Enter your email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold text-sm'
                                    >
                                        <span className='hidden sm:inline'>Subscribe</span>
                                        <IoArrowForward />
                                    </button>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center bg-green-500/20 backdrop-blur-sm rounded-full p-4 border border-green-500/40'>
                                    <FaCheck className='text-green-400 mr-2' />
                                    <span className='text-green-400 font-semibold'>Successfully Subscribed!</span>
                                </div>
                            )}
                        </form>

                        {/* Social Media */}
                        <div className='pt-4'>
                            <p className='text-gray-400 text-sm mb-4'>Follow us on social media</p>
                            <div className='flex items-center gap-3'>
                                {[
                                    { icon: <FaFacebookSquare />, color: 'hover:text-blue-500', bg: 'hover:bg-blue-500/20' },
                                    { icon: <LuInstagram />, color: 'hover:text-pink-500', bg: 'hover:bg-pink-500/20' },
                                    { icon: <FaTwitter />, color: 'hover:text-sky-400', bg: 'hover:bg-sky-400/20' },
                                    { icon: <FaLinkedin />, color: 'hover:text-blue-600', bg: 'hover:bg-blue-600/20' }
                                ].map((social, index) => (
                                    
                                    <a    key={index}
                                        href="#"
                                        className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 text-lg`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                {/* <div className='border-y border-gray-700 py-8'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                        {[
                            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $150' },
                            { icon: '💯', title: 'Money Back', desc: '30 day guarantee' },
                            { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
                            { icon: '24/7', title: 'Support', desc: 'Dedicated support' }
                        ].map((feature, index) => (
                            <div key={index} className='flex items-center gap-4 group'>
                                <div className='text-4xl group-hover:scale-110 transition-transform'>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className='font-semibold text-white'>{feature.title}</h4>
                                    <p className='text-sm text-gray-400'>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Bottom Footer */}
                <div className='py-6 border-t border-gray-700'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                        {/* Payment Methods */}
                        <div className='flex items-center gap-3 flex-wrap justify-center md:justify-start'>
                            <p className='text-gray-400 text-sm mr-2'>We accept:</p>
                            {[
                                { icon: <LiaCcVisa />, name: 'Visa' },
                                { icon: <SiApplepay />, name: 'Apple Pay' },
                                { icon: <FaGooglePay />, name: 'Google Pay' },
                                { icon: <LiaCcAmex />, name: 'Amex' },
                                { icon: <BsPaypal />, name: 'PayPal' }
                            ].map((payment, index) => (
                                <div
                                    key={index}
                                    className='w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group'
                                    title={payment.name}
                                >
                                    <span className='text-2xl text-gray-300 group-hover:text-white transition-colors'>
                                        {payment.icon}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className='text-center md:text-right'>
                            <p className='text-gray-400 text-sm'>
                                © 2024 <span className='text-white font-semibold'>Krist</span>. All rights reserved.
                            </p>
                            <p className='text-gray-500 text-xs mt-1'>
                                Made with ❤️ for fashion lovers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'></div>
        </footer>
    );
};

export default Footer;