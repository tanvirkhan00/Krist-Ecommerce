import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { clientAccount } from '../../Components/Slice/productSlice.jsx';
import { useDispatch } from 'react-redux';
import { getSafeUserObject } from '../../Utils/authUtils.js';

// Image
import title from "../../assets/LogoWebsite.png";
import image from "../../assets/Image.png";

// Icons
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { FiMail, FiLock } from "react-icons/fi";
import { FaHandSparkles } from "react-icons/fa";

const LoginSection = () => {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passWord, setPassWord] = useState('');
    const [passWordErr, setPassWordErr] = useState('');
    const [passShow, setPassShow] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailErr('');
        setPassWordErr('');
        setSuccessMessage('');

        let hasError = false;

        // Email validation
        if (!email) {
            setEmailErr('Please enter your email');
            hasError = true;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErr('Please enter a valid email address');
            hasError = true;
        }

        // Password validation
        if (!passWord) {
            setPassWordErr('Please enter your password');
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);
        signInWithEmailAndPassword(auth, email, passWord)
            .then((userCredential) => {
                const safeUser = getSafeUserObject(userCredential.user);
                
                // Dispatch to Redux store
                dispatch(clientAccount(safeUser));
                
                // Show success message
                setSuccessMessage('Login successful! Redirecting...');
                
                // Navigate after delay
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.code, error.message);

                switch (error.code) {
                    case 'auth/user-not-found':
                        setEmailErr('No account found with this email');
                        break;
                    case 'auth/wrong-password':
                    case 'auth/invalid-login-credentials':
                    case 'auth/invalid-credential':
                        setPassWordErr('Invalid email or password');
                        break;
                    case 'auth/too-many-requests':
                        setPassWordErr('Too many attempts. Please try again later');
                        break;
                    case 'auth/network-request-failed':
                        setPassWordErr('Network error. Please check your connection');
                        break;
                    default:
                        setPassWordErr('An error occurred. Please try again');
                }
            });
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('');
    };

    const handlePass = (e) => {
        setPassWord(e.target.value);
        setPassWordErr('');
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user document exists in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            // If user document doesn't exist, create it
            if (!userDoc.exists()) {
                const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
                await setDoc(userDocRef, {
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    name: user.displayName || '',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                    photoURL: user.photoURL || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }

            const safeUser = getSafeUserObject(user);
            
            // Dispatch to Redux store
            dispatch(clientAccount(safeUser));
            
            setSuccessMessage('Login successful! Redirecting...');
            
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            setGoogleLoading(false);
            const errorCode = error.code;
            console.error('Google sign-in error:', errorCode);
            
            if (errorCode.includes('auth/popup-closed-by-user')) {
                // User closed popup, no error message needed
            } else if (errorCode.includes('auth/cancelled-popup-request')) {
                // Popup cancelled, no error message needed
            } else if (errorCode.includes('auth/network-request-failed')) {
                setPassWordErr('Network error. Please check your connection');
            } else {
                setPassWordErr('Google sign-in failed. Please try again');
            }
        }
    };

    const handleEye = () => {
        setPassShow(!passShow);
    };

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4 mt-[100px]">
                <div className="flex items-center justify-center lg:justify-between flex-wrap gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Left Side - Image */}
                    <div className="hidden lg:block lg:basis-[48%] relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                className="absolute top-8 left-8 z-10 w-32 drop-shadow-lg"
                                src={title}
                                alt="Logo"
                            />
                            <img
                                className="w-full h-[700px] object-cover"
                                src={image}
                                alt="Login illustration"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:basis-[45%] max-w-md">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                    <span className="text-yellow-400 animate-bounce">
                                        <FaHandSparkles />
                                    </span>
                                </h1>
                                <p className="text-gray-600">
                                    Please login to continue
                                </p>
                            </div>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                    <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                                    <p className="text-green-800 text-sm">{successMessage}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiMail className="text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            onChange={handleEmail}
                                            value={email}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${emailErr
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            type="email"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    {emailErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {emailErr}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            onChange={handlePass}
                                            value={passWord}
                                            className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg outline-none transition-all ${passWordErr
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            type={passShow ? 'text' : 'password'}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleEye}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {passShow ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                        </button>
                                    </div>
                                    {passWordErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {passWordErr}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onChange={handleRememberMe}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="rememberMe" className="text-sm text-gray-700">
                                            Remember Me
                                        </label>
                                    </div>
                                    <Link
                                        to="/forgetPassword"
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging In...
                                        </span>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={handleGoogle}
                                disabled={googleLoading}
                                className={`w-full flex items-center justify-center gap-3 py-3 border-2 rounded-lg font-medium transition-all ${googleLoading
                                    ? 'bg-gray-50 border-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                    }`}
                            >
                                {googleLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-gray-600">Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <FcGoogle size={24} />
                                        <span className="text-gray-700">Login with Google</span>
                                    </>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/signUp"
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                            Secure login • Your data is protected
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;