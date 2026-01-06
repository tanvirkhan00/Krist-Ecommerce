import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Image
import Image3 from "../../assets/Image3.png";

// Icons
import { LuChevronLeft } from 'react-icons/lu';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';

const OtpSection = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from navigation state (passed from ForgetPassword page)
    const userEmail = location.state?.email || 'your registered email';

    // Timer for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    // Handle OTP input change
    const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last digit
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        // Focus last filled input or next empty
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    // Verify OTP
    const handleVerify = async (e) => {
        e.preventDefault();

        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('Please enter complete 6-digit code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Get stored OTP and check expiration (10 minutes)
            const storedOTP = sessionStorage.getItem('resetOTP');
            const storedEmail = sessionStorage.getItem('resetEmail');
            const timestamp = sessionStorage.getItem('otpTimestamp');

            const now = Date.now();
            const otpAge = now - parseInt(timestamp);
            const maxAge = 10 * 60 * 1000; // 10 minutes

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (!storedOTP || !timestamp) {
                setLoading(false);
                setError('Verification code expired. Please request a new one.');
                return;
            }

            if (otpAge > maxAge) {
                setLoading(false);
                setError('Verification code expired. Please request a new one.');
                sessionStorage.removeItem('resetOTP');
                sessionStorage.removeItem('otpTimestamp');
                return;
            }

            if (otpCode !== storedOTP) {
                setLoading(false);
                setError('Invalid verification code. Please try again.');
                return;
            }

            // OTP verified successfully
            setSuccess(true);

            setTimeout(() => {
                navigate('/resetPassword', {
                    state: {
                        email: storedEmail,
                        verified: true
                    }
                });
            }, 1500);

        } catch (error) {
            setLoading(false);
            setError('Verification failed. Please try again.');
        }
    };

    // Resend OTP
    const handleResend = async () => {
        if (!canResend) return;

        setCanResend(false);
        setResendTimer(60);
        setError('');
        setOtp(['', '', '', '', '', '']);

        try {
            // Generate new OTP
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

            // Simulate sending OTP
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store new OTP
            sessionStorage.setItem('resetOTP', newOtp);
            sessionStorage.setItem('otpTimestamp', Date.now().toString());

            // For demo, log the OTP (in production, this would be emailed)
            console.log('New OTP sent:', newOtp);

        } catch (error) {
            setError('Failed to resend code. Please try again.');
            setCanResend(true);
        }
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
                                src={Image3}
                                alt="OTP verification illustration"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:basis-[45%] max-w-md">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {/* Back Button */}
                            <Link
                                to="/forgetPassword"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
                            >
                                <LuChevronLeft className="text-xl" />
                                Back
                            </Link>

                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    Enter Verification Code
                                </h1>
                                <p className="text-gray-600 leading-relaxed">
                                    We've sent a 6-digit verification code to
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-blue-600">
                                    <FiMail />
                                    <span className="font-medium">{userEmail}</span>
                                </div>
                            </div>

                            {/* Success Message */}
                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                    <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-green-800 text-sm font-medium">Verification successful!</p>
                                        <p className="text-green-700 text-xs">Redirecting...</p>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                    <MdErrorOutline className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
                                    <p className="text-red-800 text-sm">{error}</p>
                                </div>
                            )}

                            {/* OTP Form */}
                            <form onSubmit={handleVerify} className="space-y-6">
                                {/* OTP Inputs */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Enter 6-digit code
                                    </label>
                                    <div className="flex gap-2 justify-between">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                disabled={loading || success}
                                                className={`w-full aspect-square text-center text-2xl font-bold border-2 rounded-lg outline-none transition-all ${error
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : success
                                                            ? 'border-green-300 bg-green-50'
                                                            : 'border-gray-200 focus:border-blue-500'
                                                    } ${(loading || success) ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Verify Button */}
                                <button
                                    type="submit"
                                    disabled={loading || success || otp.join('').length !== 6}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading || success || otp.join('').length !== 6
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
                                            Verifying...
                                        </span>
                                    ) : success ? (
                                        'Verified ✓'
                                    ) : (
                                        'Verify Code'
                                    )}
                                </button>
                            </form>

                            {/* Resend Code */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Didn't receive the code?{' '}
                                    {canResend ? (
                                        <button
                                            onClick={handleResend}
                                            className="text-blue-600 hover:text-blue-700 font-semibold"
                                        >
                                            Resend Code
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">
                                            Resend in {resendTimer}s
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">💡 Tip:</span> The verification code is valid for 10 minutes. Check your spam folder if you don't see the email.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtpSection;