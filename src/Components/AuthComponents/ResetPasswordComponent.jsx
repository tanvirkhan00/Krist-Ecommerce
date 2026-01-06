import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

// Image
import Image2 from "../../assets/Image2.png";

// Icons
import { LuChevronLeft } from 'react-icons/lu';
import { FiLock } from 'react-icons/fi';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

const ResetPasswordComponent = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    // Check if user is verified
    const verified = location.state?.verified;
    const email = location.state?.email;

    useEffect(() => {
        // Redirect if not verified
        if (!verified || !email) {
            navigate('/forgetPassword');
        }
    }, [verified, email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setNewPasswordErr('');
        setConfirmPasswordErr('');
        setSuccessMessage('');

        let hasError = false;

        // Password validation
        if (!newPassword) {
            setNewPasswordErr('Please enter a new password');
            hasError = true;
        } else {
            if (!/(?=.*[a-z])/.test(newPassword)) {
                setNewPasswordErr('Must contain at least one lowercase letter');
                hasError = true;
            } else if (!/(?=.*[A-Z])/.test(newPassword)) {
                setNewPasswordErr('Must contain at least one uppercase letter');
                hasError = true;
            } else if (!/(?=.*[0-9])/.test(newPassword)) {
                setNewPasswordErr('Must contain at least one number');
                hasError = true;
            } else if (!/(?=.*[!@#$%^&*])/.test(newPassword)) {
                setNewPasswordErr('Must contain at least one special character (!@#$%^&*)');
                hasError = true;
            } else if (!/(?=.{8,})/.test(newPassword)) {
                setNewPasswordErr('Must be at least 8 characters');
                hasError = true;
            }
        }

        // Confirm password validation
        if (!confirmPassword) {
            setConfirmPasswordErr('Please confirm your password');
            hasError = true;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordErr('Passwords do not match');
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);

        try {
            // In a real implementation with Firebase, you would:
            // 1. Use the password reset token from Firebase
            // 2. Call confirmPasswordReset(auth, oobCode, newPassword)

            // For this demo with OTP flow, we'll simulate the password update
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccessMessage('Password reset successfully! Redirecting to login...');

            // Clear stored OTP data
            sessionStorage.removeItem('resetOTP');
            sessionStorage.removeItem('resetEmail');
            sessionStorage.removeItem('otpTimestamp');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setLoading(false);
            setNewPasswordErr('Failed to reset password. Please try again.');
        }
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
        setNewPasswordErr('');
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordErr('');
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        if (!newPassword) return null;
        let strength = 0;
        if (newPassword.length >= 8) strength++;
        if (/[a-z]/.test(newPassword)) strength++;
        if (/[A-Z]/.test(newPassword)) strength++;
        if (/[0-9]/.test(newPassword)) strength++;
        if (/[!@#$%^&*]/.test(newPassword)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength();

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
                                alt="Reset password illustration"
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
                                    Reset Password
                                </h1>
                                <p className="text-gray-600 leading-relaxed">
                                    Choose a strong password to secure your account
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
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* New Password */}
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="text-gray-400" />
                                        </div>
                                        <input
                                            id="newPassword"
                                            onChange={handleNewPassword}
                                            value={newPassword}
                                            disabled={loading || successMessage}
                                            className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg outline-none transition-all ${newPasswordErr
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-blue-500'
                                                } ${(loading || successMessage) ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            disabled={loading || successMessage}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {newPassword && !newPasswordErr && (
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

                                    {newPasswordErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {newPasswordErr}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            onChange={handleConfirmPassword}
                                            value={confirmPassword}
                                            disabled={loading || successMessage}
                                            className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg outline-none transition-all ${confirmPasswordErr
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : confirmPassword && newPassword === confirmPassword
                                                        ? 'border-green-300 focus:border-green-500'
                                                        : 'border-gray-200 focus:border-blue-500'
                                                } ${(loading || successMessage) ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={loading || successMessage}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                        </button>
                                    </div>

                                    {confirmPassword && newPassword === confirmPassword && !confirmPasswordErr && (
                                        <p className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                            <MdCheckCircle /> Passwords match
                                        </p>
                                    )}

                                    {confirmPasswordErr && (
                                        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <MdErrorOutline /> {confirmPasswordErr}
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
                                            Resetting Password...
                                        </span>
                                    ) : successMessage ? (
                                        'Password Reset ✓'
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Password Requirements */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</p>
                            <ul className="text-xs text-blue-800 space-y-1">
                                <li>• At least 8 characters long</li>
                                <li>• Contains uppercase and lowercase letters</li>
                                <li>• Includes at least one number</li>
                                <li>• Has at least one special character (!@#$%^&*)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordComponent;