import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { Link, useNavigate } from 'react-router-dom';
import { deletProduct } from './Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';

// img
import title from "../assets/LogoWebsite.png"

// Icon
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";



const Navbar = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])
    const [cartShow, setCartShow] = useState(false)
    const [searchItem, setSearchItem] = useState([])
    const [inputValue, setInputValue] = useState()
    let navigate = useNavigate()
    let dispatch = useDispatch()

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

    let handleNavigate = (itemId) => {
        navigate(`/product/${itemId}`)
        setInputValue("")
        setSearchItem([])
    }

    // Cart 
    let cartQuantity = useSelector((state) => state.product.CartItem)
    let cartLenth = cartQuantity.length

    // Delete Cart
    let handleTrash = (trash) => {
        dispatch(deletProduct(trash))
    }

    // Navigate Category Item
    let handleCategory = (item) => {
        navigate(`/category/${item}`);
    }

    // Navigate cart Items
    let handlecartNavigate = (itemId) => {
        navigate(`/product/${itemId.id}`)
    }

    // Total Price
    let total =cartQuantity.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty)
    },0)






    return (
        <>
            <nav className='fixed w-full z-50 left-0  top-0 bg-white bg-opacity-90'>
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
                                                <li onClick={() => handleCategory(item)} className='cursor-pointer'>{item}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                                <li>Our Story</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='relative flex items-center gap-3'>
                            <div>
                                <input value={inputValue} onChange={handleSearch} className='border-2 border-black outline-none rounded-md px-2 py-1 text-[16px]' placeholder='Search Your Product' type="search" />
                                {searchItem.length > 0 &&
                                    <div className='absolute bg-white border-2 border-black h-[400px] w-[250px]  py-5 px-3 overflow-y-scroll flex flex-col gap-3'>
                                        {searchItem.map((item) => (
                                            <div onClick={() => handleNavigate(item.id)} className='flex items-center gap-2 shadow-sm cursor-pointer shadow-black'>
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
                            <div className='border-2 border-black rounded-md px-2 py-2 btnHover cursor-pointer relative'>
                                <span className='' onClick={handleCart}><BsHandbag /></span>
                                <span className='absolute -top-6 -right-2 bg-black text-white w-[25px] h-[25px] rounded-full flex justify-center items-center'>{cartLenth}</span>
                            </div>
                            <button className='border-2 border-black px-3 py-1 rounded-md btnHover'><Link to="/login">Login</Link></button>
                            {cartShow &&
                                <div className='absolute shadow-md shadow-black bg-white w-[300px] h-[600px] overflow-y-scroll top-10 right-0 z-50 p-2'>
                                    <h1 className="text-[14px] text-green-700">You Have {cartLenth} Items in Your Cart</h1>
                                    <h1 className="text-center font-semibold text-[25px] text-blue-800">Cart Items</h1>
                                    <div className="flex flex-col gap-3 mt-3 h-[300px] overflow-y-scroll">
                                        {cartQuantity.map((item,index) => (
                                            <div className='flex items-center gap-2 shadow-sm shadow-black p-1 cursor-pointer duration-700 ease-in-out group  hover:-translate-y-2'>
                                                <div onClick={() => handlecartNavigate(item)} className='flex items-center gap-2'>
                                                    <img className='h-[60px] w-[60px]' src={item.thumbnail} alt="" />
                                                    <div>
                                                        <h1 className="text-[14px] font-semibold w-[175px] truncate">{item.title}</h1>
                                                        <p className="text-[14px] text-red-500"><span className='text-black'>{item.qty}</span> * ${item.price} </p>
                                                    </div>
                                                </div>
                                                <div onClick={() => handleTrash(index)} className='absolute right-0 pr-2 opacity-0 duration-700 ease-in-out text-[16px] hover:text-red-500 hover:scale-110 group-hover:opacity-100'>
                                                    <span><IoTrashOutline /></span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex items-center justify-between border-t-2 border-slate-300 mt-5 pt-1 px-2'>
                                        <h3 className='font-semibold text-[20px]'>Subtotal</h3>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className='flex flex-col gap-3 mt-3'>
                                        <button className='border-2 border-black rounded-md py-3 btnHover'>View Cart</button>
                                        <button className='border-2 border-black rounded-md py-3 btnHover'><Link to="/checkOut">CheckOut</Link></button>
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