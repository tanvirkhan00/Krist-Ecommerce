import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';

// img
import title from "../assets/LogoWebsite.png"

// Icon
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";


const Navbar = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])

    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])
    console.log(category);



    return (
        <>
            <nav>
                <div className="container">
                    <div className='flex items-center justify-between h-[100px]'>
                        <div>
                            <Link to="/"> <img src={title} alt="" /></Link>
                        </div>
                        <div>
                            <ul className='flex items-center gap-4'>
                                <li><Link to="/">Home</Link></li>
                                <div className="relative group">
                                    <li className="flex items-center gap-1 cursor-pointer">
                                       <Link to="/shop"> Shop </Link><span className='animate-bounce'><IoChevronDown /></span>
                                    </li>
                                    <div className="flex h-[300px] flex-wrap justify-center items-center gap-3 w-[500px] bg-slate-100 p-5 z-10 absolute top-8 -left-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out -translate-y-5">
                                        {category.map((item) => (
                                            <ul>
                                                <li className='cursor-pointer'>{item}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                                <li>Our Story</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='flex items-center gap-3 text-[20px]'>
                            <span><CiSearch /></span>
                            <span><CiHeart /></span>
                            <span><BsHandbag /></span>
                            <button className='border-2 border-black px-3 py-1 rounded-md btnHover'><Link to="/login">Login</Link></button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;