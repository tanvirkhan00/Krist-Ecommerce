import React, { useContext, useEffect, useRef, useState } from "react";
import { apiData } from "./ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { deletProduct } from "./Slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

// img
import title from "../assets/LogoWebsite.png";

// Icon
import { CiHeart } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoChevronDown, IoTrashOutline } from "react-icons/io5";
import { FiMenu, FiSearch } from "react-icons/fi";

const Navbar = () => {
  const products = useContext(apiData) || [];
  const [category, setCategory] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [searchItem, setSearchItem] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [menuShow, setMenuShow] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const searchRef = useRef();

  // Filter unique categories
  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((item) => item.category)),
      ];
      setCategory(uniqueCategories);
    }
  }, [products]);

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setSearchItem([]);
    } else {
      const filterData = products.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchItem(filterData || []);
    }
  };

  // Navigation functions
  const handleNavigate = (itemId) => {
    navigate(`/product/${itemId}`);
    setInputValue("");
    setSearchItem([]);
    setShowMobileSearch(false);
    setMenuShow(false);
  };

  const handleCategory = (item) => {
    navigate(`/category/${item}`);
    setMenuShow(false);
  };

  const handleCartNavigate = (item) => {
    navigate(`/product/${item.id}`);
    setCartShow(false);
  };

  // Cart functionality
  const cartQuantity = useSelector((state) => state.product?.CartItem) || [];
  const cartLength = cartQuantity.length;

  const handleCart = () => {
    setCartShow((prev) => !prev);
  };

  const handleTrash = (index) => {
    dispatch(deletProduct(index));
  };

  // Calculate total price
  const total = cartQuantity.reduce(
    (acc, curr) => acc + (curr.price || 0) * (curr.qty || 1),
    0
  );

 useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuShow(false);
    }
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowMobileSearch(false);
    }
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      // Only close if not clicking on the cart icon itself
      if (!e.target.closest('.cart-icon-container')) {
        setCartShow(false);
      }
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <nav className="fixed w-full z-50 left-0 top-0 bg-white/90 backdrop-blur-md border-b-2 border-blue-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] lg:h-[100px]">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="block" onClick={() => setMenuShow(false)}>
              <img
                className="duration-700 ease-in-out hover:scale-105 hover:shadow-custom-shadow transition-all max-h-12 w-auto"
                src={title}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block relative">
            <ul className="flex items-center gap-x-8 xl:gap-x-10 font-sans text-[#767676] text-[18px] font-medium">
              <li className="hover:text-blue-500 transition-colors duration-300">
                <Link to="/" className="block py-2">
                  Home
                </Link>
              </li>

              {/* Shop Dropdown */}
              <div className="relative group py-2">
                <li className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  <Link to="/shop" className="block">
                    Shop
                  </Link>
                  <span className="transition-transform group-hover:rotate-180 duration-300">
                    <IoChevronDown />
                  </span>
                </li>

                {/* Dropdown Menu */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 w-[500px] bg-white p-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out shadow-lg rounded-md border border-gray-200 grid grid-cols-2 gap-4">
                  {category.length > 0 ? (
                    category.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleCategory(item)}
                        className="cursor-pointer p-3 rounded-md hover:bg-blue-50 transition-colors duration-200 text-base flex items-center"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-3 text-gray-500">
                      No categories available
                    </div>
                  )}
                </div>
              </div>

              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Our Story</span>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Blog</span>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Contact Us</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Input */}
            <div className="hidden sm:block relative min-w-[250px]">
              <input
                value={inputValue}
                onChange={handleSearch}
                className="w-full border-2 border-black outline-none rounded-md px-3 py-2 text-[16px] focus:border-blue-500 transition-colors duration-300"
                placeholder="Search Your Product"
                type="search"
              />
              {searchItem.length > 0 && (
                <div className="absolute bg-white border-2 border-black h-[400px] w-[280px] py-5 px-3 overflow-y-auto flex flex-col gap-3 z-50 shadow-xl rounded-md top-full mt-1">
                  {searchItem.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleNavigate(item.id)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    >
                      <img
                        className="h-[50px] w-[50px] object-cover rounded"
                        src={item.thumbnail}
                        alt=""
                      />
                      <div className="flex flex-col text-sm">
                        <h1 className="font-semibold w-[180px] truncate">
                          {item.title}
                        </h1>
                        <p className="text-red-500">$ {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <span className="hidden sm:block cursor-pointer border-2 border-black rounded-md p-2 btnHover hover:bg-black hover:text-white transition-all duration-300">
                <Link to="/wishList" className="block">
                  <CiHeart className="text-xl" />
                </Link>
              </span>

              {/* Cart */}
              <div className="cart-container border-2 border-black rounded-md p-2 btnHover cursor-pointer relative hover:bg-black hover:text-white transition-all duration-300">
                <span onClick={handleCart}>
                  <BsHandbag className="text-xl" />
                </span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-[25px] h-[25px] rounded-full flex justify-center items-center text-sm font-bold">
                  {cartLength}
                </span>
              </div>

              {/* Login Button */}
              <button className="hidden sm:block border-2 border-black px-3 py-2 rounded-md btnHover hover:bg-black hover:text-white transition-all duration-300 text-base">
                <Link to="/login">Login</Link>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setShowMobileSearch(!showMobileSearch);
                  setMenuShow(false);
                }}
                className="p-2 text-xl"
                aria-label="Search"
              >
                <FiSearch />
              </button>

              <button
                onClick={() => {
                  setMenuShow((prev) => !prev);
                  setShowMobileSearch(false);
                }}
                className="text-2xl focus:outline-none p-2 hover:bg-gray-100 rounded-md transition-colors duration-300"
                aria-label="Toggle menu"
                ref={menuRef}
              >
                <FiMenu />
              </button>
            </div>
          </div>

          {/* Cart Dropdown */}
          {cartShow && (
            <div
              className="absolute shadow-2xl bg-white w-[350px] h-[600px] overflow-y-auto top-14 right-0 z-[60] p-4 rounded-lg border"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the cart
            >
              <h1 className="text-sm text-green-700 mb-2">
                You Have {cartLength} {cartLength === 1 ? "Item" : "Items"} in
                Your Cart
              </h1>
              <h1 className="text-center font-semibold text-xl sm:text-[25px] text-blue-800 mb-4">
                Cart Items
              </h1>

              <div className="flex flex-col gap-3 h-[300px] overflow-y-auto mb-4">
                {cartQuantity.length > 0 ? (
                  cartQuantity.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 shadow-sm shadow-black p-2 cursor-pointer duration-300 ease-in-out group hover:-translate-y-1 hover:shadow-md rounded-md relative"
                    >
                      <div
                        onClick={() => {
                          handleCartNavigate(item);
                          setCartShow(false);
                        }}
                        className="flex items-center gap-2 flex-1"
                      >
                        <img
                          className="h-[60px] w-[60px] object-cover rounded"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <div className="flex-1">
                          <h1 className="text-sm font-semibold truncate pr-6">
                            {item.title}
                          </h1>
                          <p className="text-sm text-red-500">
                            <span className="text-black">{item.qty}</span> × $
                            {item.price}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrash(index);
                        }}
                        className="absolute right-2 opacity-0 duration-300 ease-in-out text-lg hover:text-red-500 hover:scale-110 group-hover:opacity-100 p-1"
                      >
                        <IoTrashOutline />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Your cart is empty
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t-2 border-slate-300 pt-3 px-2 mb-4">
                <h3 className="font-semibold text-lg sm:text-[20px]">
                  Subtotal
                </h3>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate("/");
                    setCartShow(false);
                  }}
                  className="border-2 border-black rounded-md py-3 btnHover hover:bg-black hover:text-white transition-all duration-300 font-medium"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/checkout");
                    setCartShow(false);
                  }}
                  className="border-2 border-black rounded-md py-3 btnHover hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 font-medium"
                >
                  CheckOut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Panel */}
      {showMobileSearch && (
        <div
          className="lg:hidden fixed top-[70px] left-0 w-full bg-white z-50 p-4 shadow-md"
          ref={searchRef}
        >
          <div className="relative w-full">
            <input
              value={inputValue}
              onChange={handleSearch}
              className="w-full border-2 border-blue-500 outline-none rounded-md px-3 py-2 text-base"
              placeholder="Search Your Product"
              type="search"
              autoFocus
            />
            {searchItem.length > 0 && (
              <div className="absolute bg-white border-2 border-gray-200 max-h-[400px] w-full py-3 px-3 overflow-y-auto flex flex-col gap-3 z-50 shadow-xl rounded-md top-full mt-1">
                {searchItem.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleNavigate(item.id);
                      setShowMobileSearch(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  >
                    <img
                      className="h-[50px] w-[50px] object-cover rounded"
                      src={item.thumbnail}
                      alt=""
                    />
                    <div className="flex flex-col text-sm">
                      <h1 className="font-semibold truncate">{item.title}</h1>
                      <p className="text-red-500">$ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuShow && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuShow(false)}
          />
          <div className="lg:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#262626] z-50 overflow-y-auto transition-all duration-300">
            <ul className="font-sans text-[#767676] text-base font-medium p-5 space-y-4">
              <li className="hover:text-blue-500 transition-colors duration-300">
                <Link
                  to="/"
                  className="block py-2"
                  onClick={() => setMenuShow(false)}
                >
                  Home
                </Link>
              </li>

              {/* Mobile Shop Dropdown */}
              <div className="relative">
                <li className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors duration-300 py-2">
                  <Link to="/shop" onClick={() => setMenuShow(false)}>
                    Shop
                  </Link>
                  <span>
                    <IoChevronDown />
                  </span>
                </li>

                {/* Mobile Dropdown Menu */}
                <div className="pl-4 mt-2 space-y-2">
                  {category.length > 0 ? (
                    category.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          handleCategory(item);
                          setMenuShow(false);
                        }}
                        className="cursor-pointer py-2 px-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-sm"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 p-2">No categories</div>
                  )}
                </div>
              </div>

              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Our Story</span>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Blog</span>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <span className="block py-2 cursor-pointer">Contact Us</span>
              </li>

              {/* Mobile-only actions */}
              <div className="pt-4 border-t border-gray-600">
                <div className="relative w-full mb-4">
                  <input
                    value={inputValue}
                    onChange={handleSearch}
                    className="w-full border-2 border-blue-500 outline-none rounded-md px-3 py-2 text-base"
                    placeholder="Search Your Product"
                    type="search"
                  />
                  {searchItem.length > 0 && (
                    <div className="absolute bg-white border-2 border-gray-200 max-h-[300px] w-full py-3 px-3 overflow-y-auto flex flex-col gap-3 z-50 shadow-xl rounded-md top-full mt-1">
                      {searchItem.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleNavigate(item.id);
                            setMenuShow(false);
                          }}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        >
                          <img
                            className="h-[50px] w-[50px] object-cover rounded"
                            src={item.thumbnail}
                            alt=""
                          />
                          <div className="flex flex-col text-sm">
                            <h1 className="font-semibold truncate">
                              {item.title}
                            </h1>
                            <p className="text-red-500">$ {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="w-full border-2 border-white rounded-md py-3 text-white hover:bg-white hover:text-black transition-all duration-300 text-base mb-2">
                  <Link to="/login" onClick={() => setMenuShow(false)}>
                    Login
                  </Link>
                </button>
                <Link
                  to="/wishList"
                  className="flex items-center justify-center gap-2 w-full border-2 border-white rounded-md py-3 text-white hover:bg-white hover:text-black transition-all duration-300 text-base"
                  onClick={() => setMenuShow(false)}
                >
                  <CiHeart className="text-xl" />
                  Wishlist
                </Link>
              </div>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
