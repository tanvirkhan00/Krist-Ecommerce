import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { apiData } from '../ContextApi';
import RelatedProducts from '../ProductDetailsPage/RelatedProducts';
import { useDispatch } from 'react-redux';
import { addToCart, WishList } from '../Slice/productSlice';
import { getAuth } from 'firebase/auth';

// Icons
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const SingleProduct = () => {
    let products = useContext(apiData);
    const { id } = useParams();
    const dispatch = useDispatch();

    // Review States
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "John Doe",
            rating: 5,
            comment: "Excellent product! Highly recommended.",
            date: "2024-01-15"
        },
        {
            id: 2,
            name: "Jane Smith",
            rating: 4,
            comment: "Good quality, fast shipping.",
            date: "2024-01-10"
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

    if (!products || products.length === 0) {
        return <p className='text-center py-10'>Loading...</p>;
    }

    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <p className='text-center py-10'>Product not found!</p>;
    }

    let filterCategory = products.filter((item) => item.category === product.category);

    // Add Cart
    let handleCart = (itemId) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Please Create Account");
        } else if (user.emailVerified == false) {
            alert("Please Verify Gmail");
        } else {
            dispatch(addToCart({ ...itemId, qty: quantity }));
            alert("Product added to cart!");
        }
    };

    // WishList 
    let handleWishList = (itemId) => {
        dispatch(WishList({ ...itemId, qty: 1 }));
        alert("Added to wishlist!");
    };

    // Handle Review Submit
    const handleReviewSubmit = () => {
        if (!newReview.name || !newReview.comment) {
            alert("Please fill in all fields");
            return;
        }

        const reviewToAdd = {
            id: reviews.length + 1,
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0]
        };

        setReviews([reviewToAdd, ...reviews]);
        setNewReview({ name: '', rating: 5, comment: '' });
        setShowReviewForm(false);
        alert("Review submitted successfully!");
    };

    // Calculate Average Rating
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : product.rating;

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <>
            <section className="bg-white py-8 mt-[150px]">
                <div className="max-w-[1400px] mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-600 mb-6">
                        <span className="hover:underline cursor-pointer">Home</span> / 
                        <span className="hover:underline cursor-pointer"> {product.category}</span> / 
                        <span className="text-black"> {product.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                                <img 
                                    src={product.thumbnail} 
                                    alt={product.title}
                                    className="w-full h-full object-contain p-8"
                                />
                            </div>
                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.slice(0, 4).map((img, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer hover:opacity-75 transition">
                                            <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h1 className="text-3xl font-medium">{product.title}</h1>
                                    <span className="text-sm text-green-600 font-medium">{product.availabilityStatus}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.floor(averageRating) ? '' : 'text-gray-300'} />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {averageRating} ({reviews.length} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="border-y border-gray-200 py-6">
                                <p className="text-3xl font-semibold">${product.price}</p>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">Brand:</span>
                                    <span className="text-gray-600">{product.brand}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">Stock:</span>
                                    <span className="text-gray-600">{product.stock} units available</span>
                                </div>
                                {product.sku && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">SKU:</span>
                                        <span className="text-gray-600">{product.sku}</span>
                                    </div>
                                )}
                            </div>

                            {/* Size Selection */}
                            <div>
                                <p className="text-sm font-medium mb-3">Size</p>
                                <div className="flex items-center gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border-2 rounded-sm text-sm font-medium transition ${
                                                selectedSize === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-300 hover:border-black'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <p className="text-sm font-medium mb-3">Quantity</p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 border border-gray-300 rounded-sm hover:border-black transition"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 border border-gray-300 rounded-sm hover:border-black transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart & Wishlist */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => handleCart(product)}
                                    className="flex-1 bg-black text-white py-4 rounded-sm hover:bg-gray-800 transition font-medium"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleWishList(product)}
                                    className="w-14 h-14 border-2 border-gray-300 rounded-sm hover:border-black transition flex items-center justify-center"
                                >
                                    <CiHeart className="text-2xl" />
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="border border-gray-300 rounded-sm px-4 py-3 text-center text-sm">
                                    {product.warrantyInformation}
                                </div>
                                <div className="border border-gray-300 rounded-sm px-4 py-3 text-center text-sm">
                                    {product.returnPolicy}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-16">
                        <div className="border-b border-gray-200">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`pb-4 text-sm font-medium transition ${
                                        activeTab === 'description'
                                            ? 'border-b-2 border-black'
                                            : 'text-gray-600 hover:text-black'
                                    }`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`pb-4 text-sm font-medium transition ${
                                        activeTab === 'reviews'
                                            ? 'border-b-2 border-black'
                                            : 'text-gray-600 hover:text-black'
                                    }`}
                                >
                                    Reviews ({reviews.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('shipping')}
                                    className={`pb-4 text-sm font-medium transition ${
                                        activeTab === 'shipping'
                                            ? 'border-b-2 border-black'
                                            : 'text-gray-600 hover:text-black'
                                    }`}
                                >
                                    Shipping
                                </button>
                            </div>
                        </div>

                        <div className="py-8">
                            {activeTab === 'description' && (
                                <div className="max-w-3xl space-y-4 text-gray-700">
                                    <p>{product.description}</p>
                                    <h3 className="font-medium text-black mt-6">Product Details</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {product.weight && <li>Weight: {product.weight}g</li>}
                                        {product.dimensions && (
                                            <li>Dimensions: {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</li>
                                        )}
                                        <li>Warranty: {product.warrantyInformation}</li>
                                        <li>Shipping: {product.shippingInformation}</li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="max-w-3xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-medium">Customer Reviews</h3>
                                        <button
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                            className="border border-black px-6 py-2 rounded-sm hover:bg-black hover:text-white transition text-sm font-medium"
                                        >
                                            {showReviewForm ? 'Cancel' : 'Write a Review'}
                                        </button>
                                    </div>

                                    {/* Review Form */}
                                    {showReviewForm && (
                                        <div className="bg-gray-50 p-6 rounded-lg mb-8 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Your Name</label>
                                                <input
                                                    type="text"
                                                    value={newReview.name}
                                                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                                                    className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:border-black"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Rating</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setNewReview({...newReview, rating: star})}
                                                            className="text-2xl"
                                                        >
                                                            <FaStar className={star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Your Review</label>
                                                <textarea
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                                    className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:border-black h-32 resize-none"
                                                />
                                            </div>

                                            <button
                                                onClick={handleReviewSubmit}
                                                className="bg-black text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition font-medium"
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    )}

                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="border-b border-gray-200 pb-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <p className="font-medium">{review.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex gap-1 text-yellow-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} size={14} />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="max-w-3xl space-y-4 text-gray-700">
                                    <p className="font-medium text-black">Shipping Information</p>
                                    <p>{product.shippingInformation}</p>
                                    <p className="font-medium text-black mt-6">Return Policy</p>
                                    <p>{product.returnPolicy}</p>
                                    <ul className="list-disc pl-5 space-y-2 mt-4">
                                        <li>Free shipping on orders over $50</li>
                                        <li>Standard delivery: 5-7 business days</li>
                                        <li>Express delivery: 2-3 business days</li>
                                        <li>International shipping available</li>
                                    </ul>
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