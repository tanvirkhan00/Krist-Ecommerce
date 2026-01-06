// Firebase Configuration for Authentication

/**
 * IMPORTANT: Email Verification Settings
 * 
 * Set REQUIRE_EMAIL_VERIFICATION to:
 * - true: Users must verify email before logging in (RECOMMENDED for production)
 * - false: Users can login without email verification (for development/testing only)
 */

export const AUTH_CONFIG = {
    // Toggle email verification requirement
    REQUIRE_EMAIL_VERIFICATION: false, // Set to true for production
    
    // Send verification email on signup
    SEND_VERIFICATION_EMAIL: true,
};

/**
 * PRODUCTION CHECKLIST:
 * ☐ Set REQUIRE_EMAIL_VERIFICATION to true
 * ☐ Ensure email service is properly configured in Firebase
 * ☐ Test email delivery to various email providers
 * ☐ Configure custom email templates in Firebase Console
 */