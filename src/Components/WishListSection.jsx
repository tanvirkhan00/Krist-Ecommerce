import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteWishProduct } from './Slice/productSlice.jsx';

// Icons
import { GoTrash } from 'react-icons/go';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const WishListSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // WishList 
    let WishListItem = useSelector((state) => state.product.WishListItem);
    
    let handleSingleItem = (itemId) => {
        navigate(`/product/${itemId.id}`);
    };
    
    let handleTrash = (trash) => {
        dispatch(deleteWishProduct(trash));
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4 mt-[100px] max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FiHeart className="text-3xl text-red-500" />
                        <h1 className="text-4xl font-bold text-gray-900">
                            My Wishlist
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        {WishListItem.length} {WishListItem.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                {/* Empty State */}
                {WishListItem.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <FiHeart className="text-5xl text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-6 text-center max-w-md">
                            Save your favorite items here so you can find them easily later
                        </p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Desktop View */}
                        <div className="hidden lg:block">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2">Price</div>
                                    <div className="col-span-2">Brand</div>
                                    <div className="col-span-2">Category</div>
                                    <div className="col-span-1 text-right">Action</div>
                                </div>

                                {/* Table Body */}
                                <div className="divide-y divide-gray-200">
                                    {WishListItem.map((item, index) => (
                                        <div 
                                            key={index}
                                            className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors group"
                                        >
                                            {/* Product Info */}
                                            <div 
                                                className="col-span-5 flex items-center gap-4 cursor-pointer"
                                                onClick={() => handleSingleItem(item)}
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <img 
                                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200" 
                                                        src={item.thumbnail} 
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2 flex items-center">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    ${item.price}
                                                </span>
                                            </div>

                                            {/* Brand */}
                                            <div className="col-span-2 flex items-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                                    {item.brand}
                                                </span>
                                            </div>

                                            {/* Category */}
                                            <div className="col-span-2 flex items-center">
                                                <span className="text-gray-600 capitalize">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="col-span-1 flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleTrash(index)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Remove from wishlist"
                                                >
                                                    <GoTrash className="text-xl" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="lg:hidden space-y-4">
                            {WishListItem.map((item, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    <div className="p-4">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div 
                                                className="flex-shrink-0 cursor-pointer"
                                                onClick={() => handleSingleItem(item)}
                                            >
                                                <img 
                                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200" 
                                                    src={item.thumbnail} 
                                                    alt={item.title}
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 
                                                    className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                                                    onClick={() => handleSingleItem(item)}
                                                >
                                                    {item.title}
                                                </h3>
                                                
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-gray-900">
                                                            ${item.price}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                            {item.brand}
                                                        </span>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                            <button
                                                onClick={() => handleSingleItem(item)}
                                                className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                                            >
                                                <FiShoppingCart />
                                                View Product
                                            </button>
                                            <button
                                                onClick={() => handleTrash(index)}
                                                className="px-4 py-2.5 border border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
                                                title="Remove"
                                            >
                                                <GoTrash className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => navigate('/products')}
                                className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg transition-all font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default WishListSection;