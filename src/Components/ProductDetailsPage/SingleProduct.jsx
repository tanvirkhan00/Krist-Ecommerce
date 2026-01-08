import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { apiData } from '../ContextApi';
import RelatedProducts from '../ProductDetailsPage/RelatedProducts';
import { useDispatch } from 'react-redux';
import { addToCart, WishList } from '../Slice/productSlice';
import { getAuth } from 'firebase/auth';

// Icons
import { FaStar, FaShippingFast, FaUndo, FaShieldAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { HiMiniSparkles } from "react-icons/hi2";

const SingleProduct = () => {
    let products = useContext(apiData);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States
    const [authError, setAuthError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [successToast, setSuccessToast] = useState({ show: false, message: '' });
    const [selectedImage, setSelectedImage] = useState(0);
    
    // Review States
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "John Doe",
            rating: 5,
            comment: "Excellent product! Highly recommended. The quality exceeded my expectations.",
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "Jane Smith",
            rating: 4,
            comment: "Good quality, fast shipping. Would buy again!",
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "Mike Johnson",
            rating: 5,
            comment: "Amazing value for money. Very satisfied with this purchase.",
            date: "2024-01-05",
            verified: false
        }
    ]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        name: '',
        rating: 5,
        comment: ''
    });

    // Active Tab State
    const [activeTab, setActiveTab] = useState('description');

    // Selected Options
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

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

    // Handle Auth Modal Actions
    const handleGoToLogin = () => {
        setShowAuthModal(false);
        navigate('/login');
    };

    const handleGoToSignup = () => {
        setShowAuthModal(false);
        navigate('/signUp');
    };

    if (!products || products.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto'></div>
                    <p className='mt-6 text-gray-600 font-medium'>Loading product...</p>
                </div>
            </div>
        );
    }

    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>
                <div className='text-center max-w-md'>
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl">🔍</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Product not found</h3>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist</p>
                    <Link to="/products">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Browse Products
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    let filterCategory = products.filter((item) => item.category === product.category && item.id !== product.id);
    const productImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    // Add Cart with Authentication
    let handleCart = () => {
        if (!checkAuth()) return;
        
        dispatch(addToCart({ ...product, qty: quantity }));
        showSuccessToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`);
    };

    // WishList with Authentication
    let handleWishList = () => {
        if (!checkAuth()) return;
        
        dispatch(WishList({ ...product, qty: 1 }));
        showSuccessToast('Added to wishlist');
    };

    // Handle Review Submit
    const handleReviewSubmit = () => {
        if (!checkAuth()) return;

        if (!newReview.name || !newReview.comment) {
            showSuccessToast('Please fill in all fields');
            return;
        }

        const reviewToAdd = {
            id: reviews.length + 1,
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0],
            verified: true
        };

        setReviews([reviewToAdd, ...reviews]);
        setNewReview({ name: '', rating: 5, comment: '' });
        setShowReviewForm(false);
        showSuccessToast('Review submitted successfully!');
    };

    // Calculate Average Rating
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : product.rating;

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
                
                * {
                    font-family: 'Poppins', sans-serif;
                }
                
                .heading-font {
                    font-family: 'Playfair Display', serif;
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

                .image-zoom {
                    transition: transform 0.5s ease;
                }

                .image-zoom:hover {
                    transform: scale(1.1);
                }
            `}</style>

            <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 mt-[150px]">
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

                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-600 mb-8 flex items-center gap-2">
                        <Link to="/" className="hover:text-purple-600 transition">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-purple-600 transition capitalize">{product.category}</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold line-clamp-1">{product.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Product Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="bg-white rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-gray-200 shadow-sm relative">
                                <img 
                                    src={productImages[selectedImage]} 
                                    alt={product.title}
                                    className="w-full h-full object-contain p-8 image-zoom"
                                />
                                {/* Discount Badge */}
                                {product.discountPercentage > 10 && (
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                            SAVE {Math.round(product.discountPercentage)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnail Gallery */}
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-3">
                                    {productImages.slice(0, 5).map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`bg-white rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-300 border-2 ${
                                                selectedImage === index 
                                                    ? 'border-purple-600 shadow-lg scale-105' 
                                                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                                            }`}
                                        >
                                            <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover p-2" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full mb-4">
                                    <HiMiniSparkles className="text-purple-600" />
                                    <span className="text-sm font-semibold text-gray-700 capitalize">{product.category}</span>
                                </div>
                                
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h1 className="text-4xl font-bold heading-font text-gray-900">{product.title}</h1>
                                    {product.availabilityStatus === 'In Stock' && (
                                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">
                                            ✓ In Stock
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4 py-4 border-y border-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.floor(averageRating) ? '' : 'text-gray-300'} size={20} />
                                        ))}
                                    </div>
                                    <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
                                </div>
                                <span className="text-gray-500">|</span>
                                <button 
                                    onClick={() => setActiveTab('reviews')}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline"
                                >
                                    {reviews.length} Reviews
                                </button>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <p className="text-4xl font-bold text-gray-900">${product.price}</p>
                                    {product.discountPercentage > 0 && (
                                        <p className="text-xl text-gray-400 line-through">
                                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                                {product.discountPercentage > 0 && (
                                    <p className="text-sm text-green-600 font-semibold">
                                        You save ${((product.price / (1 - product.discountPercentage / 100)) - product.price).toFixed(2)} ({Math.round(product.discountPercentage)}% off)
                                    </p>
                                )}
                            </div>

                            {/* Product Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-1">Brand</p>
                                    <p className="font-semibold text-gray-900">{product.brand}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-1">Stock</p>
                                    <p className="font-semibold text-gray-900">{product.stock} units</p>
                                </div>
                                {product.sku && (
                                    <div className="bg-white rounded-xl p-4 border border-gray-200 col-span-2">
                                        <p className="text-sm text-gray-500 mb-1">SKU</p>
                                        <p className="font-semibold text-gray-900">{product.sku}</p>
                                    </div>
                                )}
                            </div>

                            {/* Size Selection */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                                <p className="text-sm font-bold mb-4 text-gray-900">Select Size</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                selectedSize === size
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-purple-200'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                                <p className="text-sm font-bold mb-4 text-gray-900">Quantity</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-bold text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-bold text-lg"
                                    >
                                        +
                                    </button>
                                    <span className="text-sm text-gray-500 ml-2">
                                        ({product.stock} available)
                                    </span>
                                </div>
                            </div>

                            {/* Add to Cart & Wishlist */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={handleCart}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleWishList}
                                    className="w-16 h-16 border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center group"
                                >
                                    <CiHeart className="text-3xl group-hover:text-purple-600 transition" />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-center">
                                    <FaShippingFast className="text-2xl text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-900">{product.shippingInformation}</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-center">
                                    <FaUndo className="text-2xl text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-900">{product.returnPolicy}</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-center">
                                    <FaShieldAlt className="text-2xl text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-900">{product.warrantyInformation}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-20 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="border-b border-gray-200">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`pb-4 px-2 text-base font-semibold transition-all duration-300 ${
                                        activeTab === 'description'
                                            ? 'border-b-4 border-purple-600 text-purple-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`pb-4 px-2 text-base font-semibold transition-all duration-300 ${
                                        activeTab === 'reviews'
                                            ? 'border-b-4 border-purple-600 text-purple-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Reviews ({reviews.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('shipping')}
                                    className={`pb-4 px-2 text-base font-semibold transition-all duration-300 ${
                                        activeTab === 'shipping'
                                            ? 'border-b-4 border-purple-600 text-purple-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Shipping & Returns
                                </button>
                            </div>
                        </div>

                        <div className="py-8">
                            {activeTab === 'description' && (
                                <div className="max-w-4xl space-y-6 text-gray-700">
                                    <p className="text-lg leading-relaxed">{product.description}</p>
                                    <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">Product Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {product.weight && (
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Weight</p>
                                                <p className="font-semibold">{product.weight}g</p>
                                            </div>
                                        )}
                                        {product.dimensions && (
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                                                <p className="font-semibold">
                                                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                                                </p>
                                            </div>
                                        )}
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500 mb-1">Warranty</p>
                                            <p className="font-semibold">{product.warrantyInformation}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500 mb-1">Shipping</p>
                                            <p className="font-semibold">{product.shippingInformation}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="max-w-4xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-2xl font-bold heading-font text-gray-900">Customer Reviews</h3>
                                            <p className="text-gray-600 mt-1">{reviews.length} verified reviews</p>
                                        </div>
                                        <button
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
                                        >
                                            {showReviewForm ? 'Cancel' : 'Write a Review'}
                                        </button>
                                    </div>

                                    {/* Review Form */}
                                    {showReviewForm && (
                                        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 rounded-2xl mb-8 space-y-6 border border-gray-200">
                                            <h4 className="text-lg font-bold text-gray-900">Share Your Experience</h4>
                                            
                                            <div>
                                                <label className="block text-sm font-semibold mb-3 text-gray-900">Your Name</label>
                                                <input
                                                    type="text"
                                                    value={newReview.name}
                                                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-3 text-gray-900">Rating</label>
                                                <div className="flex gap-3">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setNewReview({...newReview, rating: star})}
                                                            className="text-3xl transition-transform hover:scale-110"
                                                        >
                                                            <FaStar className={star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-3 text-gray-900">Your Review</label>
                                                <textarea
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 h-32 resize-none transition"
                                                    placeholder="Tell us what you think..."
                                                />
                                            </div>

                                            <button
                                                onClick={handleReviewSubmit}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    )}

                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <p className="font-bold text-gray-900">{review.name}</p>
                                                            {review.verified && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                                                    ✓ Verified Purchase
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex gap-1 text-yellow-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} size={16} />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-500">{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="max-w-4xl space-y-8">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-4">Shipping Information</h3>
                                        <p className="text-gray-700 mb-6 leading-relaxed">{product.shippingInformation}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-blue-50 to-purple-50/30 rounded-xl p-5 border border-gray-200">
                                                <FaShippingFast className="text-3xl text-purple-600 mb-3" />
                                                <p className="font-semibold text-gray-900 mb-1">Free Shipping</p>
                                                <p className="text-sm text-gray-600">On orders over $50</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-50 to-purple-50/30 rounded-xl p-5 border border-gray-200">
                                                <p className="font-semibold text-gray-900 mb-1">Standard Delivery</p>
                                                <p className="text-sm text-gray-600">5-7 business days</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-50 to-purple-50/30 rounded-xl p-5 border border-gray-200">
                                                <p className="font-semibold text-gray-900 mb-1">Express Delivery</p>
                                                <p className="text-sm text-gray-600">2-3 business days</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-50 to-purple-50/30 rounded-xl p-5 border border-gray-200">
                                                <p className="font-semibold text-gray-900 mb-1">International</p>
                                                <p className="text-sm text-gray-600">Worldwide shipping available</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-4">Return Policy</h3>
                                        <p className="text-gray-700 leading-relaxed">{product.returnPolicy}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <RelatedProducts filterCategory={filterCategory} />
        </>
    );
};

export default SingleProduct;