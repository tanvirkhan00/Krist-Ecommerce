import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { Link, useNavigate } from 'react-router-dom';

// img
import title from "../assets/LogoWebsite.png"

// Icon
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";


const Navbar = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])
    const [cartShow, setCartShow] = useState(false)
    const [searchItem, setSearchItem] = useState([])
    const [inputValue, setInputValue] = useState()
    let navigate =useNavigate()

    // filter Category
    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])

    // Cart View
    let handleCart = () => {
        setCartShow((prev) => !prev)
    }

    // search
    let handleSearch = (e) => {
        setSearchItem(e.target.value)

        if (e.target.value === "") {
            setSearchItem([])
        } else {
            let filterData = products.filter((item) => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
            setSearchItem(filterData)
        }
    }

    let handleNavigate =(itemId) => {
        navigate(`/product/${itemId}`)
        setInputValue("")
        setSearchItem([])
    }

    if (!searchItem) {
        return <p className="text-center pt-3">Please Wait....</p>;
    }
    






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
                        <div className='relative flex items-center gap-3 text-[20px]'>
                            <div>
                                <input value={inputValue} onChange={handleSearch} className='border-2 border-black outline-none rounded-md px-2 py-2 text-[16px]' placeholder='Search Your Product' type="search" />
                                {searchItem.length > 0 &&
                                    <div className='absolute bg-white border-2 border-black h-[400px] w-[250px] py-5 px-3 overflow-y-scroll flex flex-col gap-3'>
                                        {searchItem.map((item) => (
                                            <div onClick={() =>handleNavigate(item.id)} className='flex items-center gap-2 shadow-sm shadow-black'>
                                                <img className='h-[50px]' src={item.thumbnail} alt="" />
                                                <div className='flex flex-col text-[14px]'>
                                                    <h1 className='font-semibold w-[130px] truncate'>{item.title}</h1>
                                                    <p className='text-red-500'>$ {item.price} </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            <span className='cursor-pointer border-2 border-black rounded-md px-2 py-2 btnHover'><CiHeart /></span>
                            <span className='cursor-pointer border-2 border-black rounded-md px-2 py-2 btnHover' onClick={handleCart}><BsHandbag /></span>
                            <button className='border-2 border-black px-3 py-1 rounded-md btnHover'><Link to="/login">Login</Link></button>

                            {cartShow &&
                                <div className='absolute  bg-white border-2 border-black w-[300px] h-[500px] top-10 right-0'>
                                    <div>
                                        <img src="" alt="" />
                                        <div>
                                            <h1></h1>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;