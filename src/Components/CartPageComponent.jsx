import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Decrement, deletProduct, Increment } from './Slice/productSlice';

// Icons
import { FiMinus, FiPlus, FiShoppingBag, FiTag, FiTruck, FiLock, FiArrowRight } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { MdCheckCircle } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

const CartPageComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);

    const cartData = useSelector((state) => state.product.CartItem);

    const handleSingleItem = (itemId) => {
        navigate(`/product/${itemId.id}`);
    };

    const handleTrash = (trash) => {
        dispatch(deletProduct(trash));
    };

    const handleDecrement = (itemId) => {
        dispatch(Decrement(itemId));
    };

    const handleIncrement = (itemId) => {
        dispatch(Increment(itemId));
    };

    const handleApplyDiscount = () => {
        if (discountCode.trim()) {
            setDiscountApplied(true);
        }
    };

    // Calculations
    const subtotal = cartData.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const deliveryCharge = subtotal > 150 ? 0 : 5.00;
    const discount = discountApplied ? subtotal * 0.1 : 0; // 10% discount
    const grandTotal = subtotal + deliveryCharge - discount;

    // Empty cart state
    if (cartData.length === 0) {
        return (
            <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
                <div className="container mx-auto px-4 mt-[120px]">
                    <div className="max-w-2xl mx-auto text-center py-20">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingBag className="text-6xl text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added anything to your cart yet
                        </p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Continue Shopping
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4 mt-[120px] max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">
                        {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {/* Free shipping banner */}
                {subtotal < 150 && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                        <FiTruck className="text-blue-600 text-xl flex-shrink-0" />
                        <p className="text-sm text-blue-800">
                            Add <span className="font-bold">${(150 - subtotal).toFixed(2)}</span> more to get <span className="font-bold">FREE shipping</span>!
                        </p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Desktop Table Header */}
                            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {/* Cart Items */}
                            <div className="divide-y divide-gray-200">
                                {cartData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group p-4 md:p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Desktop Layout */}
                                        <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-6">
                                                <div
                                                    onClick={() => handleSingleItem(item)}
                                                    className="flex items-center gap-4 cursor-pointer"
                                                >
                                                    <div className="relative flex-shrink-0">
                                                        <img
                                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-1 capitalize">
                                                            {item.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2 text-center">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    ${item.price}
                                                </span>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-span-2 flex justify-center">
                                                <div className="inline-flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => handleDecrement(index)}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        disabled={item.qty <= 1}
                                                    >
                                                        <FiMinus className="text-sm" />
                                                    </button>
                                                    <span className="px-4 py-2 font-semibold text-gray-900 min-w-[40px] text-center">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrement(index)}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <FiPlus className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-2 text-right">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${(item.price * item.qty).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mobile Layout */}
                                        <div className="md:hidden">
                                            <div className="flex gap-4">
                                                <div
                                                    onClick={() => handleSingleItem(item)}
                                                    className="flex-shrink-0 cursor-pointer"
                                                >
                                                    <img
                                                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3
                                                        onClick={() => handleSingleItem(item)}
                                                        className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 line-clamp-2"
                                                    >
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-3 capitalize">
                                                        {item.category}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-lg font-bold text-gray-900">
                                                            ${(item.price * item.qty).toFixed(2)}
                                                        </span>
                                                        <div className="inline-flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                                            <button
                                                                onClick={() => handleDecrement(index)}
                                                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                                                disabled={item.qty <= 1}
                                                            >
                                                                <FiMinus className="text-xs" />
                                                            </button>
                                                            <span className="px-3 py-1 font-semibold text-sm">
                                                                {item.qty}
                                                            </span>
                                                            <button
                                                                onClick={() => handleIncrement(index)}
                                                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <FiPlus className="text-xs" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleTrash(index)}
                                            className="absolute md:relative top-4 right-4 md:top-auto md:right-auto mt-0 md:mt-4 flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors group/btn"
                                        >
                                            <GoTrash className="text-lg group-hover/btn:scale-110 transition-transform" />
                                            <span className="hidden md:inline">Remove</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Continue Shopping Button */}
                        <button
                            onClick={() => navigate('/shop')}
                            className="mt-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
                        >
                            ← Continue Shopping
                        </button>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Discount Code */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiTag className="inline mr-1" />
                                    Discount Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter code"
                                        disabled={discountApplied}
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors disabled:bg-gray-100"
                                    />
                                    {discountApplied ? (
                                        <button
                                            onClick={() => {
                                                setDiscountApplied(false);
                                                setDiscountCode('');
                                            }}
                                            className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <IoClose className="text-xl" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleApplyDiscount}
                                            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                                        >
                                            Apply
                                        </button>
                                    )}
                                </div>
                                {discountApplied && (
                                    <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                        <MdCheckCircle />
                                        <span>Discount code applied!</span>
                                    </div>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                {discountApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (10%)</span>
                                        <span className="font-semibold">-${discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-700">
                                    <span className="flex items-center gap-2">
                                        <FiTruck />
                                        Shipping
                                    </span>
                                    <span className="font-semibold">
                                        {deliveryCharge === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `$${deliveryCharge.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6 text-2xl font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <FiArrowRight />
                            </button>

                            {/* Security Badge */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <FiLock className="text-green-600" />
                                <span>Secure checkout</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center mb-3">
                                    We accept
                                </p>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                                        VISA
                                    </div>
                                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                                        MASTERCARD
                                    </div>
                                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                                        AMEX
                                    </div>
                                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                                        PAYPAL
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPageComponent;