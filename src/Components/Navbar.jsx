import React from 'react';

// img
import title from "../assets/LogoWebsite.png"

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="container">
                    <div className='flex items-center justify-between'>
                        <div>
                            <img src={title} alt="" />
                        </div>
                        <div>
                            <ul className='flex items-center gap-4'>
                                <li>Home</li>
                                <li>Shop</li>
                                <li>Our Story</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                            <button>Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;