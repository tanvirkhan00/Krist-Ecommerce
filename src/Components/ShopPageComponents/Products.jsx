import React, { useContext, useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { apiData } from '../ContextApi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { addToCart, WishList } from '../Slice/productSlice.jsx';

// Icons
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const Products = () => {
  const products = useContext(apiData);
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 40000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCategory([...new Set(products.map((item) => item.category))]);
  }, [products]);

  // Handle Category Selection
  const handleCategoryToggle = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // Handle Price Range Change
  const handleRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange({ ...priceRange, max: Number(value) });
    setCurrentPage(1);
  };

  // Apply All Filters
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
    return categoryMatch && priceMatch;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-az':
        return a.title.localeCompare(b.title);
      case 'name-za':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Import Account
  let account = useSelector((state) => state.product.Account);

  // Add to Cart
  let handleCart = (itemId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please Create Account");
    } else if (user.emailVerified == false) {
      alert("Please Verify Gmail");
    } else {
      dispatch(addToCart({ ...itemId, qty: 1 }));
    }
  };

  // WishList 
  let handleWishList = (itemId) => {
    dispatch(WishList({ ...itemId, qty: 1 }));
  };

  // Clear All Filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 40000 });
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 16;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const activeFiltersCount = selectedCategories.length + (priceRange.max < 40000 ? 1 : 0);

  return (
    <section className="min-h-screen bg-white py-8 mt-[150px]">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${showMobileFilters ? 'block fixed inset-0 bg-white z-50 overflow-y-auto' : 'hidden'} lg:block lg:w-[260px] flex-shrink-0`}>
            <div className="lg:sticky lg:top-4">
              {/* Mobile Close Button */}
              {showMobileFilters && (
                <div className="lg:hidden flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="text-2xl">&times;</button>
                </div>
              )}

              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6 p-4 lg:p-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs underline hover:no-underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="border-t border-gray-200 py-6 px-4 lg:px-0">
                <h3 className="text-sm font-medium mb-4">Category</h3>
                <div className="space-y-3">
                  {category.map((item, index) => (
                    <label key={index} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item)}
                        onChange={() => handleCategoryToggle(item)}
                        className="mr-3 w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                      />
                      <span className="text-sm group-hover:text-gray-600">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="border-t border-gray-200 py-6 px-4 lg:px-0">
                <h3 className="text-sm font-medium mb-4">Price</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">${priceRange.min}</span>
                    <span className="font-medium">${priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40000}
                    step={500}
                    value={priceRange.max}
                    onChange={handleRangeChange}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="text-xs text-gray-500">
                    The highest price is ${products.length > 0 ? Math.max(...products.map(p => p.price)) : 40000}
                  </div>
                </div>
              </div>

              {/* Mobile Apply Button */}
              {showMobileFilters && (
                <div className="lg:hidden p-4 border-t">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-sm hover:border-gray-400 transition"
                >
                  <span className="text-sm font-medium">Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-600">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black cursor-pointer bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-az">A-Z</option>
                    <option value="name-za">Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {paginatedProducts.map((item) => (
                  <div key={item.id} className="group">
                    {/* Product Image */}
                    <div className="relative bg-gray-100 mb-3 overflow-hidden aspect-square">
                      <Link to={`/product/${item.id}`}>
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </Link>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={() => handleCart(item)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap hover:bg-gray-100"
                      >
                        Add to cart
                      </button>

                      {/* Wishlist & View Icons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleWishList(item)}
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                        >
                          <CiHeart className="w-5 h-5" />
                        </button>
                        <Link to={`/product/${item.id}`}>
                          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                            <IoEyeOutline className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-sm font-normal line-clamp-2 group-hover:underline cursor-pointer">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                      <p className="text-sm font-medium">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-sm underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Products;