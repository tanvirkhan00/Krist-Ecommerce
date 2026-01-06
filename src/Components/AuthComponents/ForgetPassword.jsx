import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Image
import Image2 from "../../assets/Image2.png";

// Icons
import { LuChevronLeft } from 'react-icons/lu';
import { FiMail } from 'react-icons/fi';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailErr('');
        setSuccessMessage('');

        // Validation
        if (!email) {
            setEmailErr('Please enter your email address');
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErr('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // In production, you would send this OTP to your backend
            // which would then email it to the user
            // For now, we'll store it in sessionStorage for demo purposes
            sessionStorage.setItem('resetOTP', otp);
            sessionStorage.setItem('resetEmail', email);
            sessionStorage.setItem('otpTimestamp', Date.now().toString());

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo, log the OTP (in production, this would be emailed)
            console.log('OTP sent to email:', otp);

            setSuccessMessage('Verification code sent! Check your email.');
            setLoading(false);

            // Navigate to OTP page with email
            setTimeout(() => {
                navigate('/otp', { state: { email } });
            }, 1500);

        } catch (error) {
            setLoading(false);
            setEmailErr('Failed to send verification code. Please try again');
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('');
        setSuccessMessage('');
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4 mt-[100px]">
                <div className="flex items-center justify-center lg:justify-between flex-wrap gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Left Side - Image */}
                    <div className="hidden lg:block lg:basis-[48%]">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                className="w-full h-[650px] object-cover"
                                src={Image2}
                                alt="Forgot password illustration"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:basis-[45%] max-w-md">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {/* Back Button */}
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
                            >
                                <LuChevronLeft className="text-xl" />
                                Back to Login
                            </Link>

                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-600 leading-relaxed">
                                    No worries! Enter your registered email address and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                    <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-green-800 text-sm font-medium mb-1">{successMessage}</p>
                                        <p className="text-green-700 text-xs">Redirecting to login page...</p>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
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
                                            disabled={loading || successMessage}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg outline-none transition-all ${emailErr
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : successMessage
                                                        ? 'border-green-300 bg-green-50'
                                                        : 'border-gray-200 focus:border-blue-500'
                                                } ${(loading || successMessage) ? 'bg-gray-50 cursor-not-allowed' : ''}`}
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading || successMessage}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading || successMessage
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
                                            Sending Email...
                                        </span>
                                    ) : successMessage ? (
                                        'Code Sent ✓'
                                    ) : (
                                        'Send Verification Code'
                                    )}
                                </button>
                            </form>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-600">
                                    Remember your password?{' '}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">💡 Tip:</span> Check your spam folder if you don't receive the email within a few minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgetPassword;