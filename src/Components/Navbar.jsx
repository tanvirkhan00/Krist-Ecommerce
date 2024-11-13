import React from 'react';

// img
import title from "../assets/LogoWebsite.png"

// Icon
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { Link } from 'react-router-dom';




const Navbar = () => {
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
                                <li>Shop</li>
                                <li>Our Story</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='flex items-center gap-3 text-[20px]'>
                            <span><CiSearch/></span>
                            <span><CiHeart/></span>
                            <span><BsHandbag/></span>
                            <button className='bg-black text-white px-3 py-1 rounded-md'><Link to="/login">Login</Link></button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;