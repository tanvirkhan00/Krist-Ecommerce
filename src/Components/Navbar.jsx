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
import { IoChevronDown, IoTrashOutline, IoClose } from "react-icons/io5";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const Navbar = () => {
  const products = useContext(apiData) || [];
  const [category, setCategory] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [searchItem, setSearchItem] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [menuShow, setMenuShow] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const searchRef = useRef();
  const cartRef = useRef();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuShow(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowMobileSearch(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartShow(false);
      }
    };

    if (cartShow || menuShow || showMobileSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartShow, menuShow, showMobileSearch]);

  return (
    <nav
      className={`fixed w-full z-50 left-0 top-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-center text-sm">
        <p className="flex items-center justify-center gap-2">
          <span className="hidden sm:inline">🎉</span>
          <span>Free Shipping on Orders Over $150</span>
          <span className="hidden sm:inline">✨</span>
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-[70px] lg:h-[80px]">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="block group"
              onClick={() => setMenuShow(false)}
            >
              <img
                className="duration-500 ease-in-out group-hover:scale-110 transition-transform max-h-10 lg:max-h-12 w-auto"
                src={title}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-x-8 xl:gap-x-10 font-sans text-gray-700 text-base font-semibold">
              <li className="relative group">
                <Link
                  to="/"
                  className="block py-2 hover:text-blue-600 transition-colors duration-300"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>

              {/* Shop Dropdown */}
              <div className="relative group py-2">
                <li className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors duration-300">
                  <Link to="/shop" className="block">
                    Shop
                  </Link>
                  <span className="transition-transform group-hover:rotate-180 duration-300">
                    <IoChevronDown />
                  </span>
                </li>

                {/* Dropdown Menu */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[600px] bg-white p-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-in-out shadow-2xl rounded-2xl border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Shop by Category
                    </h3>
                    <p className="text-sm text-gray-500">
                      Explore our collection
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {category.length > 0 ? (
                      category.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleCategory(item)}
                          className="cursor-pointer p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-blue-600 border border-transparent hover:border-blue-200 capitalize flex items-center gap-2 group/item"
                        >
                          <span className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></span>
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center p-6 text-gray-500">
                        No categories available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <li className="relative group">
                <Link
                  to="/contactPage"
                  className="block py-2 hover:text-blue-600 transition-colors duration-300"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Buttons Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Input */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <input
                  value={inputValue}
                  onChange={handleSearch}
                  className="w-[280px] border-2 border-gray-200 outline-none rounded-full pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Search products..."
                  type="search"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {searchItem.length > 0 && (
                <div className="absolute bg-white border border-gray-200 max-h-[450px] w-[350px] py-4 px-3 overflow-y-auto flex flex-col gap-2 z-50 shadow-2xl rounded-xl top-full mt-2">
                  <div className="mb-2 pb-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">
                      Search Results ({searchItem.length})
                    </p>
                  </div>
                  {searchItem.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleNavigate(item.id)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="relative">
                        <img
                          className="h-[60px] w-[60px] object-cover rounded-lg border border-gray-200"
                          src={item.thumbnail}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h1>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link
                to="/wishList"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 group border border-gray-200 hover:border-transparent"
              >
                <CiHeart className="text-xl group-hover:scale-110 transition-transform" />
              </Link>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={handleCart}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 group border border-gray-200 hover:border-transparent"
                >
                  <BsHandbag className="text-xl group-hover:scale-110 transition-transform" />
                  {cartLength > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white w-5 h-5 rounded-full flex justify-center items-center text-xs font-bold shadow-lg animate-pulse">
                      {cartLength}
                    </span>
                  )}
                </button>
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-semibold"
              >
                <FiUser />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setShowMobileSearch(!showMobileSearch);
                  setMenuShow(false);
                }}
                className="p-2 text-xl hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <FiSearch />
              </button>

              <button
                onClick={() => {
                  setMenuShow((prev) => !prev);
                  setShowMobileSearch(false);
                }}
                className="text-2xl focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {menuShow ? <IoClose /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Cart Dropdown - Positioned relative to container */}
        {cartShow && (
          <div 
            ref={cartRef}
            className="absolute shadow-2xl bg-white w-[380px] max-h-[calc(100vh-100px)] top-[70px] lg:top-[80px] right-4 sm:right-6 lg:right-8 z-[60] rounded-2xl border border-gray-200 overflow-hidden mt-2"
          >
            {/* Cart Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg font-bold flex items-center gap-2">
                  <FiShoppingBag />
                  Shopping Cart
                </h1>
                <button
                  onClick={() => setCartShow(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-sm text-blue-100">
                {cartLength} {cartLength === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {cartQuantity.length > 0 ? (
                <div className="space-y-3">
                  {cartQuantity.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                      <div
                        onClick={() => handleCartNavigate(item)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          className="h-[70px] w-[70px] object-cover rounded-lg border-2 border-white shadow-sm"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <div className="flex-1 min-w-0">
                          <h1 className="text-sm font-semibold text-gray-900 truncate mb-1">
                            {item.title}
                          </h1>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              Qty: {item.qty}
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrash(index);
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110"
                        aria-label="Remove item"
                      >
                        <IoTrashOutline className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BsHandbag className="text-4xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add items to get started
                  </p>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartQuantity.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <span className="text-lg font-bold text-gray-900">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate("/cartPage");
                      setCartShow(false);
                    }}
                    className="w-full bg-white border-2 border-blue-600 text-blue-600 rounded-full py-3 font-semibold hover:bg-blue-50 transition-all duration-300"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      navigate("/");
                      setCartShow(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-3 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Checkout
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>Secure checkout</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Panel */}
      {showMobileSearch && (
        <div
          className="lg:hidden fixed top-[112px] left-0 w-full bg-white z-50 p-4 shadow-xl border-t border-gray-200"
          ref={searchRef}
        >
          <div className="relative w-full">
            <input
              value={inputValue}
              onChange={handleSearch}
              className="w-full border-2 border-blue-500 outline-none rounded-full pl-12 pr-4 py-3 text-base focus:ring-2 focus:ring-blue-200"
              placeholder="Search products..."
              type="search"
              autoFocus
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl" />
            {searchItem.length > 0 && (
              <div className="absolute bg-white border-2 border-gray-200 max-h-[400px] w-full py-3 px-3 overflow-y-auto flex flex-col gap-2 z-50 shadow-2xl rounded-2xl top-full mt-2">
                {searchItem.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleNavigate(item.id);
                      setShowMobileSearch(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <img
                      className="h-[60px] w-[60px] object-cover rounded-lg border border-gray-200"
                      src={item.thumbnail}
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <h1 className="font-semibold text-sm truncate">
                        {item.title}
                      </h1>
                      <p className="text-blue-600 font-bold mt-1">
                        ${item.price}
                      </p>
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
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-[112px]"
            onClick={() => setMenuShow(false)}
          />
          <div className="lg:hidden fixed top-[112px] left-0 w-full max-w-sm h-[calc(100vh-112px)] bg-white z-50 overflow-y-auto transition-all duration-300 shadow-2xl">
            <div className="p-6" ref={menuRef}>
              {/* Mobile Menu Header */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Menu</h2>
                <p className="text-sm text-gray-500">
                  Explore our collections
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
                    onClick={() => setMenuShow(false)}
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Home
                  </Link>
                </li>

                {/* Mobile Shop Dropdown */}
                <div>
                  <Link
                    to="/shop"
                    className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setMenuShow(false)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Shop
                    </span>
                    <IoChevronDown />
                  </Link>

                  <div className="pl-8 mt-2 space-y-1">
                    {category.length > 0 ? (
                      category.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleCategory(item);
                            setMenuShow(false);
                          }}
                          className="cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-sm font-medium text-gray-600 transition-colors capitalize"
                        >
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 p-2 text-sm">
                        No categories
                      </div>
                    )}
                  </div>
                </div>

                <li>
                  <Link
                    to="/contactPage"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer group"
                    onClick={() => setMenuShow(false)}
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>

              {/* Mobile Actions */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-3 font-semibold hover:shadow-lg transition-all"
                  onClick={() => setMenuShow(false)}
                >
                  <FiUser />
                  Login
                </Link>

                <Link
                  to="/wishList"
                  className="flex items-center justify-center gap-2 w-full border-2 border-gray-300 text-gray-700 rounded-full py-3 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
                  onClick={() => setMenuShow(false)}
                >
                  <CiHeart className="text-xl" />
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;