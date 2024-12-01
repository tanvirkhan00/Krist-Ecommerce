import React, { useContext, useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { addToCart, WishList } from './Slice/productSlice';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";



const Products = () => {

    const products = useContext(apiData)
    const [category, setCategory] = useState([])
    const [categoryItems, setCategoryItems] = useState([])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    })

    let handleCategory = (cat) => {
        let filterCategory = products.filter((item) => item.category == cat)
        setCategoryItems(filterCategory)
    }

    // Handle Price Range Change
    const handleRangeChange = (e) => {
        const value = e.target.value;
        setPriceRange({ ...priceRange, max: Number(value) });
    };

    // Apply Category and Price Filters Together
    const filteredProducts = (categoryItems.length > 0 ? categoryItems : products).filter(
        (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Import Account
    let account = useSelector((state) => state.product.Account)
    // Add to Cart
    let handleCart = (itemId) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) {
            alert("Please Create Account")
        } else if (user.emailVerified == false) {
            alert("Please Verify Gmail")
        } else {
            dispatch(addToCart({ ...itemId, qty: 1 }))
        }
    }

    // WishList 
    let handleWishList = (itemId) => {
        dispatch(WishList({ ...itemId, qty: 1 }))
    }

    // Pagination
    const itemsPerPage = 15;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)



    return (
        <>

            <section>
                <div className="container mt-[150px]">
                    <div className='flex flex-wrap gap-3 justify-between'>
                        <div className='basis-[20%]'>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Product Category</h1>
                                <div className='mt-4 flex flex-col gap-2 h-0 overflow-y-scroll opacity-0 invisible -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-[300px]'>
                                    {category.map((item, index) => (
                                        <div onClick={() => handleCategory(item)} className='flex items-center gap-2'>
                                            <input id={`category-${index}`} type="checkbox" />
                                            <label htmlFor={`category-${index}`}>{item}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Price</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div className="p-4">
                                        {/* Price Range Display */}
                                        <div className="mb-4">
                                            <p className="text-lg font-medium text-gray-700">
                                                Price: <span className="font-semibold text-blue-500">${priceRange.min}</span> - <span className="font-semibold text-blue-500">${priceRange.max}</span>
                                            </p>
                                        </div>

                                        {/* Range Slider */}
                                        <div className="relative w-full">
                                            <input
                                                type="range"
                                                min={priceRange.min} // Minimum value for slider
                                                max={40000} // Maximum value
                                                step={1} // Step size for smooth updates
                                                value={priceRange.max} // Current slider value
                                                onChange={handleRangeChange} // Update state on change
                                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            {/* Optional Styling for Range Value Indicator */}
                                            <div
                                                className="absolute top-[-1.5rem] translate-x-[-50%] bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-lg shadow"
                                                style={{
                                                    left: `${((priceRange.max - priceRange.min) / 40000) * 100}%`,
                                                }}
                                            >
                                                ${priceRange.max}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Color</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-red-500 rounded-md'></span>
                                            <h5>Red</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-blue-500 rounded-md'></span>
                                            <h5>Blue</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-orange-500 rounded-md'></span>
                                            <h5>Orange</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-black rounded-md'></span>
                                            <h5>Black</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-green-500 rounded-md'></span>
                                            <h5>Green</h5>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <span className='h-[20px] w-[20px] bg-yellow-500 rounded-md'></span>
                                            <h5>Yellow</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold text-[25px] cursor-pointer'>Filter by Size</h1>
                                <div className='mt-4 flex flex-col gap-2 opacity-0 invisible h-0 -translate-y-3 duration-700 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-translate-y-0 group-hover:h-full'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="s" type="checkbox" />
                                            <label htmlFor="s">S</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="m" type="checkbox" />
                                            <label htmlFor="m">M</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="l" type="checkbox" />
                                            <label htmlFor="l">L</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xl" type="checkbox" />
                                            <label htmlFor="xl">XL</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xxl" type="checkbox" />
                                            <label htmlFor="xxl">XXL</label>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <input id="xxxl" type="checkbox" />
                                            <label htmlFor="xxxl">XXXL</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basis-[75%] flex flex-col'>
                            <div className='flex items-center justify-between'>
                                <p>Showing {paginatedProducts.length} results of {products.length} Products</p>
                                <p>Short by latest </p>
                            </div>
                            <div className='flex flex-wrap gap-x-3 gap-y-5 mt-5'>
                                {paginatedProducts.map((item) => (
                                    <div className='basis-[24%] flex flex-col gap-3 shadow-sm shadow-black pb-2'>
                                        <div className='bg-slate-300 relative group'>
                                            <Link to={`/product/${item.id}`}><img className='h-[150px] w-[150px] mx-auto' src={item.thumbnail} alt={item.title} /></Link>
                                            <div className='bg-yellow-500 absolute bottom-0 w-full py-1 text-sm font-semibold  opacity-0 duration-700 translate-y-3 ease-in-out group-hover:opacity-100 group-hover:translate-y-0'>
                                                <p onClick={() => handleCart(item)} className='text-center cursor-pointer'>Add To Cart</p>
                                            </div>
                                            <div className='absolute top-0 right-0 flex flex-col gap-3 p-5 opacity-0 -translate-y-5 duration-700 ease-in-out group-hover:opacity-100   group-hover:-translate-y-0'>
                                                <span onClick={() => handleWishList(item)} className='bg-white cursor-pointer p-1 rounded-full text-[20px] duration-500 ease-in-out hover:scale-110 hover:text-red-500'><CiHeart /></span>
                                                <span className='bg-white cursor-pointer p-1 rounded-full text-[20px] duration-500 ease-in-out hover:scale-110 hover:text-red-500'><IoEyeOutline /></span>
                                            </div>
                                        </div>
                                        <div className='px-3'>
                                            <h1 className='font-semibold w-[200px] truncate'>{item.title}</h1>
                                            <h2>{item.category}</h2>
                                            <h5>$ {item.price}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-[30px]'>
                                <ResponsivePagination
                                    current={currentPage}
                                    total={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Products;