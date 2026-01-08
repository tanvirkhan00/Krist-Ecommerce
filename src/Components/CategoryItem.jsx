import React, { useContext, useState, useMemo } from 'react';
import { apiData } from './ContextApi';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline, IoChevronDown, IoClose, IoFilterSharp, IoCheckmarkCircle } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal, HiMiniSparkles } from "react-icons/hi2";
import { BsGrid3X3Gap, BsList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, WishList } from './Slice/productSlice';
import { getAuth } from 'firebase/auth';

const CategoryItem = () => {
    const product = useContext(apiData);
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States for filters and sorting
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [authError, setAuthError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [successToast, setSuccessToast] = useState({ show: false, message: '' });
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(false);

    // Import Account
    const account = useSelector((state) => state.product.Account);

    // Filter products by category
    const categoryItem = product.filter((item) => item.category === categoryName);

    // Get unique brands from category items
    const brands = useMemo(() => {
        const brandSet = new Set(categoryItem.map(item => item.brand).filter(Boolean));
        return Array.from(brandSet);
    }, [categoryItem]);

    // Apply filters and sorting
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...categoryItem];

        // Filter by price range
        filtered = filtered.filter(item => 
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        // Filter by brands
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(item => 
                selectedBrands.includes(item.brand)
            );
        }

        // Filter by availability
        if (inStockOnly) {
            filtered = filtered.filter(item => item.stock > 0);
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // 'featured' - keep original order
                break;
        }

        return filtered;
    }, [categoryItem, priceRange, selectedBrands, sortBy, inStockOnly]);

    // Show success toast
    const showSuccessToast = (message) => {
        setSuccessToast({ show: true, message });
        setTimeout(() => {
            setSuccessToast({ show: false, message: '' });
        }, 3000);
    };

    // Check Authentication
    const checkAuth = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            setAuthError('Please log in to continue');
            setShowAuthModal(true);
            return false;
        }
        
        if (!user.emailVerified) {
            setAuthError('Please verify your email to continue');
            setShowAuthModal(true);
            return false;
        }
        
        return true;
    };

    // Cart handler with Authentication
    const handleCart = (itemId, e) => {
        e?.stopPropagation();
        if (!checkAuth()) return;
        
        dispatch(addToCart({ ...itemId, qty: 1 }));
        showSuccessToast('Added to cart');
    };

    // WishList handler with Authentication
    const handleWishList = (itemId, e) => {
        e?.stopPropagation();
        if (!checkAuth()) return;
        
        dispatch(WishList({ ...itemId, qty: 1 }));
        showSuccessToast('Added to wishlist');
    };

    // Handle Auth Modal Actions
    const handleGoToLogin = () => {
        setShowAuthModal(false);
        navigate('/login');
    };

    const handleGoToSignup = () => {
        setShowAuthModal(false);
        navigate('/signUp');
    };

    // Toggle brand selection
    const toggleBrand = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setPriceRange([0, 10000]);
        setSelectedBrands([]);
        setSortBy('featured');
        setInStockOnly(false);
    };

    // Active filter count
    const activeFilterCount = selectedBrands.length + 
        (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0) + 
        (inStockOnly ? 1 : 0);

    if (!product || product.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto'></div>
                    <p className='mt-6 text-gray-600 font-medium'>Loading products...</p>
                </div>
            </div>
        );
    }

    // Filters Sidebar Component
    const FilterSidebar = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'fixed inset-0 z-[60] bg-white overflow-y-auto' : 'sticky top-24'}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
                
                * {
                    font-family: 'Poppins', sans-serif;
                }
                
                .heading-font {
                    font-family: 'Playfair Display', serif;
                }

                .filter-checkbox:checked {
                    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
                }

                .price-range-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
                    transition: all 0.2s;
                }
                
                .price-range-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>

            {isMobile && (
                <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                    <h3 className='text-2xl font-bold heading-font'>Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)} className='p-2 hover:bg-gray-100 rounded-full transition'>
                        <IoClose className='text-2xl' />
                    </button>
                </div>
            )}

            <div className='p-6 space-y-6'>
                {/* Active Filters Summary */}
                {activeFilterCount > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-200">
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>Active Filters</h3>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                {activeFilterCount}
                            </span>
                        </div>
                        <button 
                            onClick={clearFilters}
                            className='w-full bg-white border-2 border-gray-200 hover:border-red-500 hover:text-red-600 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300'
                        >
                            Clear All Filters
                        </button>
                        {selectedBrands.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-3'>
                                {selectedBrands.map(brand => (
                                    <span 
                                        key={brand}
                                        className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium'
                                    >
                                        {brand}
                                        <button onClick={() => toggleBrand(brand)} className='hover:text-red-500 transition'>
                                            <IoClose />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Price Range */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-gray-900">
                        <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                        Price Range
                    </h3>
                    <div className='space-y-5'>
                        <div className="flex items-center justify-between">
                            <div className="bg-gray-50 px-4 py-2 rounded-xl">
                                <span className="text-xs text-gray-500 font-medium">Min</span>
                                <p className="text-lg font-bold text-gray-900">${priceRange[0]}</p>
                            </div>
                            <div className="h-px w-8 bg-gray-300"></div>
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-purple-200">
                                <span className="text-xs text-purple-600 font-medium">Max</span>
                                <p className="text-lg font-bold text-purple-900">${priceRange[1]}</p>
                            </div>
                        </div>
                        <input
                            type='range'
                            min='0'
                            max='10000'
                            step='100'
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className='price-range-slider w-full h-2 bg-gradient-to-r from-gray-200 to-purple-200 rounded-full appearance-none cursor-pointer'
                        />
                    </div>
                </div>

                {/* Brands Filter */}
                {brands.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-gray-900">
                            <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                            Brands
                        </h3>
                        <div className='space-y-3 max-h-64 overflow-y-auto'>
                            {brands.map(brand => (
                                <label key={brand} className='flex items-center cursor-pointer group p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300'>
                                    <input
                                        type='checkbox'
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                        className='filter-checkbox mr-3 w-5 h-5 border-2 border-gray-300 rounded-md text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition cursor-pointer'
                                    />
                                    <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1'>{brand}</span>
                                    <span className="text-xs text-gray-400 font-semibold">
                                        {categoryItem.filter(p => p.brand === brand).length}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Availability */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-gray-900">
                        <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                        Availability
                    </h3>
                    <label className='flex items-center cursor-pointer group p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300'>
                        <input 
                            type='checkbox' 
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className='filter-checkbox mr-3 w-5 h-5 border-2 border-gray-300 rounded-md text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition cursor-pointer'
                        />
                        <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>In Stock Only</span>
                    </label>
                </div>
            </div>

            {isMobile && (
                <div className='sticky bottom-0 bg-white border-t p-6'>
                    <button 
                        onClick={() => setShowMobileFilters(false)}
                        className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300'
                    >
                        Show {filteredAndSortedProducts.length} Products
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <section className='bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen'>
            {/* Success Toast */}
            {successToast.show && (
                <div className="fixed top-24 right-6 z-[60] animate-slide-in">
                    <div className="bg-white rounded-xl shadow-2xl px-6 py-4 flex items-center gap-3 border border-green-100">
                        <IoCheckmarkCircle className="text-green-500 text-2xl flex-shrink-0" />
                        <p className="text-gray-800 font-medium">{successToast.message}</p>
                    </div>
                </div>
            )}

            {/* Authentication Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-slide-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative border border-gray-100">
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <IoClose size={24} />
                        </button>
                        
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3">
                                <MdErrorOutline className="text-white text-2xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 heading-font">
                                    Authentication Required
                                </h3>
                                <p className="text-gray-600">
                                    {authError}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleGoToLogin}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Log In
                            </button>
                            <button
                                onClick={handleGoToSignup}
                                className="flex-1 bg-white text-gray-700 px-6 py-3.5 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className='bg-white border-b border-gray-200'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8'>
                    {/* Breadcrumb */}
                    <div className='flex items-center gap-2 text-sm text-gray-600 mb-6'>
                        <Link to='/' className='hover:text-purple-600 transition'>Home</Link>
                        <span>/</span>
                        <span className='text-gray-900 font-semibold capitalize'>{categoryName}</span>
                    </div>

                    {/* Category Header */}
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full mb-3">
                                <HiMiniSparkles className="text-purple-600" />
                                <span className="text-sm font-semibold text-gray-700">Shop by Category</span>
                            </div>
                            <h1 className='text-4xl md:text-5xl font-bold capitalize mb-3 heading-font text-gray-900'>
                                {categoryName}
                            </h1>
                            <p className='text-gray-600 text-lg'>
                                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='flex gap-8'>
                    {/* Desktop Filters Sidebar */}
                    <aside className='hidden lg:block w-[280px] flex-shrink-0'>
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <div className='flex-1 min-w-0'>
                        {/* Toolbar */}
                        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8'>
                            <div className='flex flex-wrap items-center justify-between gap-4'>
                                {/* Mobile Filter Button */}
                                <button 
                                    onClick={() => setShowMobileFilters(true)}
                                    className='lg:hidden flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300'
                                >
                                    <IoFilterSharp size={20} />
                                    <span>Filters</span>
                                    {activeFilterCount > 0 && (
                                        <span className="bg-white text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold text-gray-900">{filteredAndSortedProducts.length}</span> {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* View Toggle */}
                                    <div className='hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg'>
                                        <button 
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <BsGrid3X3Gap size={18} />
                                        </button>
                                        <button 
                                            onClick={() => setViewMode('list')}
                                            className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <BsList size={18} />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <div className='relative'>
                                        <select 
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className='border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-purple-500 cursor-pointer bg-white hover:border-gray-300 transition-all duration-300 appearance-none pr-10'
                                        >
                                            <option value='featured'>Featured</option>
                                            <option value='newest'>Newest</option>
                                            <option value='price-low'>Price: Low to High</option>
                                            <option value='price-high'>Price: High to Low</option>
                                            <option value='name-asc'>Name: A-Z</option>
                                            <option value='name-desc'>Name: Z-A</option>
                                            <option value='rating'>Top Rated</option>
                                        </select>
                                        <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className={viewMode === 'grid' 
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                                : 'flex flex-col gap-6'
                            }>
                                {filteredAndSortedProducts.map((item) => (
                                    viewMode === 'grid' ? (
                                        // Grid View
                                        <div 
                                            key={item.id} 
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                                            onMouseEnter={() => setHoveredProduct(item.id)}
                                            onMouseLeave={() => setHoveredProduct(null)}
                                        >
                                            {/* Product Image */}
                                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 aspect-square overflow-hidden">
                                                <Link to={`/product/${item.id}`}>
                                                    <img
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </Link>
                                                
                                                {/* Gradient Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${hoveredProduct === item.id ? 'opacity-100' : 'opacity-0'}`}></div>
                                                
                                                {/* Quick Actions */}
                                                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-500 ${hoveredProduct === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                                                    <button
                                                        onClick={(e) => handleWishList(item, e)}
                                                        className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                                                        title="Add to wishlist"
                                                    >
                                                        <CiHeart className="w-5 h-5 text-gray-700" />
                                                    </button>
                                                    <Link to={`/product/${item.id}`}>
                                                        <button 
                                                            className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                                                            title="Quick view"
                                                        >
                                                            <IoEyeOutline className="w-5 h-5 text-gray-700" />
                                                        </button>
                                                    </Link>
                                                </div>

                                                {/* Discount Badge */}
                                                {item.discountPercentage > 10 && (
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            -{Math.round(item.discountPercentage)}%
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                {/* Quick Add Button */}
                                                <button
                                                    onClick={(e) => handleCart(item, e)}
                                                    className={`absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold transition-all duration-500 hover:shadow-xl hover:scale-105 ${hoveredProduct === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-5">
                                                {item.brand && (
                                                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                                                        {item.brand}
                                                    </p>
                                                )}
                                                <Link to={`/product/${item.id}`}>
                                                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 min-h-[3rem]">
                                                        {item.title}
                                                    </h3>
                                                </Link>
                                                
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-baseline gap-2">
                                                        <p className="text-xl font-bold text-gray-900">
                                                            ${item.price}
                                                        </p>
                                                        {item.discountPercentage > 0 && (
                                                            <p className="text-sm text-gray-400 line-through">
                                                                ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Rating */}
                                                    {item.rating && (
                                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                            <span className="text-yellow-500 text-sm">⭐</span>
                                                            <span className="text-sm font-semibold text-gray-700">
                                                                {item.rating}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // List View
                                        <div 
                                            key={item.id} 
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col sm:flex-row"
                                            onMouseEnter={() => setHoveredProduct(item.id)}
                                            onMouseLeave={() => setHoveredProduct(null)}
                                        >
                                            {/* Product Image */}
                                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 sm:w-64 aspect-square sm:aspect-auto overflow-hidden flex-shrink-0">
                                                <Link to={`/product/${item.id}`}>
                                                    <img
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </Link>
                                                
                                                {item.discountPercentage > 10 && (
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            -{Math.round(item.discountPercentage)}%
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div>
                                                    {item.brand && (
                                                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                                                            {item.brand}
                                                        </p>
                                                    )}
                                                    <Link to={`/product/${item.id}`}>
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-baseline gap-2 mb-2">
                                                            <p className="text-2xl font-bold text-gray-900">
                                                                ${item.price}
                                                            </p>
                                                            {item.discountPercentage > 0 && (
                                                                <p className="text-sm text-gray-400 line-through">
                                                                    ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {item.rating && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-yellow-500">⭐</span>
                                                                <span className="text-sm font-semibold text-gray-700">
                                                                    {item.rating} / 5
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => handleWishList(item, e)}
                                                            className="p-3 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
                                                            title="Add to wishlist"
                                                        >
                                                            <CiHeart className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleCart(item, e)}
                                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-4xl">🔍</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 heading-font">
                                        No products found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Try adjusting your filters to see more results
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {showMobileFilters && (
                <>
                    <div 
                        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden'
                        onClick={() => setShowMobileFilters(false)}
                    />
                    <FilterSidebar isMobile={true} />
                </>
            )}
        </section>
    );
};

export default CategoryItem;