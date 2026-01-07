import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { AUTH_CONFIG } from './AuthConfig';

// Image
import image from "../../assets/Image.png";
import title from "../../assets/LogoWebsite.png";

// Icon
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const SignUpSection = () => {
    const [fName, setFName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [lName, setLName] = useState('');
    const [lNameErr, setLNameErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passWord, setPassWord] = useState('');
    const [passWordErr, setPassWordErr] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [termsErr, setTermsErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Reset errors
        setNameErr('');
        setLNameErr('');
        setEmailErr('');
        setPassWordErr('');
        setTermsErr('');
        setSuccessMessage('');

        let hasError = false;

        // Validation
        if (!fName.trim()) {
            setNameErr('Please enter your first name');
            hasError = true;
        }

        if (!lName.trim()) {
            setLNameErr('Please enter your last name');
            hasError = true;
        }

        if (!email) {
            setEmailErr('Please enter your email');
            hasError = true;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErr('Please enter a valid email address');
            hasError = true;
        }

        if (!passWord) {
            setPassWordErr('Please enter a password');
            hasError = true;
        } else {
            if (!/(?=.*[a-z])/.test(passWord)) {
                setPassWordErr('Must contain at least one lowercase letter');
                hasError = true;
            } else if (!/(?=.*[A-Z])/.test(passWord)) {
                setPassWordErr('Must contain at least one uppercase letter');
                hasError = true;
            } else if (!/(?=.*[0-9])/.test(passWord)) {
                setPassWordErr('Must contain at least one number');
                hasError = true;
            } else if (!/(?=.*[!@#$%^&*])/.test(passWord)) {
                setPassWordErr('Must contain at least one special character (!@#$%^&*)');
                hasError = true;
            } else if (!/(?=.{8,})/.test(passWord)) {
                setPassWordErr('Must be at least 8 characters');
                hasError = true;
            }
        }

        if (!agreeTerms) {
            setTermsErr('You must agree to the Terms & Conditions');
            hasError = true;
        }

        if (hasError) return;

        // Create user
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, passWord);
            const user = userCredential.user;

            // Update user profile with display name
            const fullName = `${fName.trim()} ${lName.trim()}`;
            await updateProfile(user, {
                displayName: fullName
            });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName: fName.trim(),
                lastName: lName.trim(),
                name: fullName,
                email: email,
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            // Conditionally send verification email based on config
            if (AUTH_CONFIG.SEND_VERIFICATION_EMAIL) {
                try {
                    await sendEmailVerification(user);
                    setSuccessMessage('Account created successfully! Please check your email for verification.');
                } catch (error) {
                    console.error('Email verification error:', error.code);
                    setSuccessMessage('Account created! Redirecting to login...');
                }
            } else {
                setSuccessMessage('Account created successfully! Redirecting to login...');
            }

            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (error) {
            setLoading(false);
            const errorCode = error.code;
            console.error('Signup error:', errorCode, error.message);
            
            if (errorCode.includes('auth/email-already-in-use')) {
                setEmailErr('This email is already registered');
            } else if (errorCode.includes('auth/weak-password')) {
                setPassWordErr('Password is too weak');
            } else if (errorCode.includes('auth/invalid-email')) {
                setEmailErr('Invalid email format');
            } else {
                setEmailErr('An error occurred. Please try again.');
            }
        }
    };

    const handleFName = (e) => {
        setFName(e.target.value);
        setNameErr('');
    };

    const handleLName = (e) => {
        setLName(e.target.value);
        setLNameErr('');
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('');
    };

    const handlePass = (e) => {
        setPassWord(e.target.value);
        setPassWordErr('');
    };

    const passwordVisible = () => {
        setVisiblePass(!visiblePass);
    };

    const handleTermsChange = (e) => {
        setAgreeTerms(e.target.checked);
        setTermsErr('');
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        if (!passWord) return null;
        let strength = 0;
        if (passWord.length >= 8) strength++;
        if (/[a-z]/.test(passWord)) strength++;
        if (/[A-Z]/.test(passWord)) strength++;
        if (/[0-9]/.test(passWord)) strength++;
        if (/[!@#$%^&*]/.test(passWord)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength();

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
                                alt="Signup illustration"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:basis-[45%] max-w-md">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Create Account
                                </h1>
                                <p className="text-gray-600">
                                    Join us today and start your journey
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
                            <form onSubmit={handleSignUp} className="space-y-5">
                                {/* First Name */}
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            id="firstName"
                                            onChange={handleFName}
                                            value={fName}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${nameErr
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            type="text"
                                            placeholder="John"
                                        />
                                    </div>
                                    {nameErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {nameErr}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            id="lastName"
                                            onChange={handleLName}
                                            value={lName}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${lNameErr
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            type="text"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {lNameErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {lNameErr}
                                        </p>
                                    )}
                                </div>

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
                                            type={visiblePass ? "text" : "password"}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={passwordVisible}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {visiblePass ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {passWord && !passWordErr && (
                                        <div className="mt-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= level
                                                                ? passwordStrength <= 2
                                                                    ? 'bg-red-500'
                                                                    : passwordStrength <= 3
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-green-500'
                                                                : 'bg-gray-200'
                                                            }`}
                                                    ></div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1">
                                                Password strength: {
                                                    passwordStrength <= 2 ? 'Weak' :
                                                        passwordStrength <= 3 ? 'Medium' :
                                                            'Strong'
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {passWordErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {passWordErr}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreeTerms}
                                            onChange={handleTermsChange}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-700">
                                            I agree to the{' '}
                                            <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                                Terms & Conditions
                                            </Link>{' '}
                                            and{' '}
                                            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>
                                    {termsErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {termsErr}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
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
                                            Creating Account...
                                        </span>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Login Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                            By signing up, you'll get access to exclusive features and updates
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpSection;