import React, { useContext, useState, useMemo } from 'react';
import { apiData } from './ContextApi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline, IoChevronDown, IoClose, IoFilterSharp } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { BsGrid, BsListUl } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, WishList } from './Slice/productSlice';
import { getAuth } from 'firebase/auth';

const CategoryItem = () => {
    const product = useContext(apiData);
    const { categoryName } = useParams();
    const dispatch = useDispatch();

    // States for filters and sorting
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

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
            default:
                // 'featured' - keep original order
                break;
        }

        return filtered;
    }, [categoryItem, priceRange, selectedBrands, sortBy]);

    // Import Account
    let account = useSelector((state) => state.product.Account);

    // Cart handler
    let handleCart = (itemId) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Please Create Account");
        } else if (user.emailVerified === false) {
            alert("Please Verify Gmail");
        } else {
            dispatch(addToCart({ ...itemId, qty: 1 }));
        }
    };

    // WishList handler
    let handleWishList = (itemId) => {
        dispatch(WishList({ ...itemId, qty: 1 }));
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
    };

    if (!product || product.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Loading products...</p>
                </div>
            </div>
        );
    }

    // Filters Sidebar Component
    const FilterSidebar = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : 'sticky top-24'}`}>
            {isMobile && (
                <div className='flex items-center justify-between p-4 border-b'>
                    <h3 className='text-lg font-semibold'>Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)} className='p-2'>
                        <IoClose className='text-2xl' />
                    </button>
                </div>
            )}

            <div className='p-6 space-y-8'>
                {/* Active Filters */}
                {(selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
                    <div>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='font-semibold text-sm uppercase tracking-wide'>Active Filters</h3>
                            <button 
                                onClick={clearFilters}
                                className='text-xs text-blue-600 hover:text-blue-800 underline'
                            >
                                Clear All
                            </button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {selectedBrands.map(brand => (
                                <span 
                                    key={brand}
                                    className='inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm'
                                >
                                    {brand}
                                    <button onClick={() => toggleBrand(brand)} className='hover:text-red-500'>
                                        <IoClose />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Range */}
                <div>
                    <h3 className='font-semibold mb-4 text-sm uppercase tracking-wide'>Price Range</h3>
                    <div className='space-y-4'>
                        <input
                            type='range'
                            min='0'
                            max='10000'
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className='w-full accent-black'
                        />
                        <div className='flex items-center justify-between text-sm'>
                            <span className='font-medium'>${priceRange[0]}</span>
                            <span className='font-medium'>${priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Brands Filter */}
                {brands.length > 0 && (
                    <div>
                        <h3 className='font-semibold mb-4 text-sm uppercase tracking-wide'>Brands</h3>
                        <div className='space-y-3 max-h-64 overflow-y-auto'>
                            {brands.map(brand => (
                                <label key={brand} className='flex items-center gap-3 cursor-pointer group'>
                                    <input
                                        type='checkbox'
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                        className='w-4 h-4 accent-black cursor-pointer'
                                    />
                                    <span className='text-sm group-hover:text-gray-600'>{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Availability */}
                <div>
                    <h3 className='font-semibold mb-4 text-sm uppercase tracking-wide'>Availability</h3>
                    <label className='flex items-center gap-3 cursor-pointer'>
                        <input type='checkbox' className='w-4 h-4 accent-black cursor-pointer' />
                        <span className='text-sm'>In Stock Only</span>
                    </label>
                </div>
            </div>

            {isMobile && (
                <div className='sticky bottom-0 bg-white border-t p-4'>
                    <button 
                        onClick={() => setShowMobileFilters(false)}
                        className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
                    >
                        View {filteredAndSortedProducts.length} Products
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <>
            <section className='bg-gray-50 min-h-screen'>
                {/* Header Section */}
                <div className='bg-white border-b'>
                    <div className='container mx-auto px-4 pt-32 pb-8'>
                        {/* Breadcrumb */}
                        <div className='flex items-center gap-2 text-sm text-gray-600 mb-4'>
                            <Link to='/' className='hover:text-black'>Home</Link>
                            <span>/</span>
                            <span className='text-black capitalize'>{categoryName}</span>
                        </div>

                        {/* Category Title */}
                        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
                            <div>
                                <h1 className='text-3xl md:text-4xl font-bold capitalize mb-2'>{categoryName}</h1>
                                <p className='text-gray-600'>{filteredAndSortedProducts.length} products</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container mx-auto px-4 py-8'>
                    <div className='flex gap-8'>
                        {/* Desktop Filters Sidebar */}
                        <aside className='hidden lg:block w-64 flex-shrink-0'>
                            <FilterSidebar />
                        </aside>

                        {/* Main Content */}
                        <div className='flex-1 min-w-0'>
                            {/* Toolbar */}
                            <div className='bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm'>
                                {/* Mobile Filter Button */}
                                <button 
                                    onClick={() => setShowMobileFilters(true)}
                                    className='lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50'
                                >
                                    <IoFilterSharp />
                                    <span className='font-medium'>Filters</span>
                                </button>

                                {/* Sort Dropdown */}
                                <div className='relative'>
                                    <button 
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className='flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 min-w-[200px] justify-between'
                                    >
                                        <span className='text-sm font-medium'>
                                            Sort by: {sortBy === 'featured' ? 'Featured' : 
                                                     sortBy === 'price-low' ? 'Price: Low to High' :
                                                     sortBy === 'price-high' ? 'Price: High to Low' :
                                                     sortBy === 'name-asc' ? 'Name: A-Z' : 'Name: Z-A'}
                                        </span>
                                        <IoChevronDown className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showSortDropdown && (
                                        <div className='absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10'>
                                            {[
                                                { value: 'featured', label: 'Featured' },
                                                { value: 'price-low', label: 'Price: Low to High' },
                                                { value: 'price-high', label: 'Price: High to Low' },
                                                { value: 'name-asc', label: 'Name: A-Z' },
                                                { value: 'name-desc', label: 'Name: Z-A' }
                                            ].map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setShowSortDropdown(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm ${
                                                        sortBy === option.value ? 'bg-gray-100 font-medium' : ''
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* View Toggle */}
                                <div className='hidden md:flex items-center gap-2 border rounded-lg p-1'>
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        <BsGrid />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        <BsListUl />
                                    </button>
                                </div>
                            </div>

                            {/* Products Grid/List */}
                            {filteredAndSortedProducts.length > 0 ? (
                                <div className={viewMode === 'grid' 
                                    ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' 
                                    : 'flex flex-col gap-4'
                                }>
                                    {filteredAndSortedProducts.map(item => (
                                        <div 
                                            key={item.id} 
                                            className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
                                                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
                                            }`}
                                        >
                                            {/* Image Container */}
                                            <div className={`relative bg-gray-100 overflow-hidden ${
                                                viewMode === 'list' ? 'w-48 h-48' : 'w-full aspect-square'
                                            }`}>
                                                <Link to={`/product/${item.id}`}>
                                                    <img 
                                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                                                        src={item.thumbnail} 
                                                        alt={item.title} 
                                                    />
                                                </Link>

                                                {/* Discount Badge */}
                                                {item.discountPercentage && (
                                                    <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                                                        -{Math.round(item.discountPercentage)}%
                                                    </span>
                                                )}

                                                {/* Quick Action Icons */}
                                                <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
                                                    <button 
                                                        onClick={() => handleWishList(item)} 
                                                        className='bg-white p-2 rounded-full shadow-md hover:scale-110 hover:text-red-500 transition-all'
                                                        aria-label='Add to wishlist'
                                                    >
                                                        <CiHeart className='text-xl' />
                                                    </button>
                                                    <Link 
                                                        to={`/product/${item.id}`}
                                                        className='bg-white p-2 rounded-full shadow-md hover:scale-110 hover:text-blue-500 transition-all'
                                                        aria-label='Quick view'
                                                    >
                                                        <IoEyeOutline className='text-xl' />
                                                    </Link>
                                                </div>

                                                {/* Add to Cart Button - Desktop */}
                                                <button
                                                    onClick={() => handleCart(item)}
                                                    className='absolute bottom-0 left-0 right-0 bg-black text-white py-3 font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800'
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                                                <div>
                                                    {item.brand && (
                                                        <p className='text-xs text-gray-500 uppercase tracking-wide mb-1'>{item.brand}</p>
                                                    )}
                                                    <Link to={`/product/${item.id}`}>
                                                        <h3 className='font-semibold text-sm md:text-base mb-2 hover:text-gray-600 transition-colors line-clamp-2'>
                                                            {item.title}
                                                        </h3>
                                                    </Link>

                                                    {/* Rating */}
                                                    {item.rating && (
                                                        <div className='flex items-center gap-1 mb-2'>
                                                            <div className='flex text-yellow-400'>
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i}>
                                                                        {i < Math.floor(item.rating) ? '★' : '☆'}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <span className='text-xs text-gray-600'>({item.rating})</span>
                                                        </div>
                                                    )}

                                                    {/* Price */}
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-lg font-bold'>${item.price}</span>
                                                        {item.discountPercentage && (
                                                            <span className='text-sm text-gray-400 line-through'>
                                                                ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Mobile Add to Cart */}
                                                <button
                                                    onClick={() => handleCart(item)}
                                                    className='md:hidden mt-3 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors'
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='bg-white rounded-lg p-12 text-center'>
                                    <div className='max-w-md mx-auto'>
                                        <div className='text-6xl mb-4'>🔍</div>
                                        <h3 className='text-xl font-semibold mb-2'>No products found</h3>
                                        <p className='text-gray-600 mb-6'>
                                            Try adjusting your filters or search criteria
                                        </p>
                                        <button 
                                            onClick={clearFilters}
                                            className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
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
                            className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
                            onClick={() => setShowMobileFilters(false)}
                        />
                        <FilterSidebar isMobile={true} />
                    </>
                )}
            </section>
        </>
    );
};

export default CategoryItem;