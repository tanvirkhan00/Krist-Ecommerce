import { getAuth } from 'firebase/auth';

/**
 * Centralized authentication checker
 * @returns {Object} { isAuthenticated: boolean, user: object|null, error: string|null }
 */
export const checkUserAuthentication = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
      error: 'Please log in to continue'
    };
  }

  if (!user.emailVerified) {
    return {
      isAuthenticated: false,
      user: user,
      error: 'Please verify your email to continue'
    };
  }

  return {
    isAuthenticated: true,
    user: user,
    error: null
  };
};

/**
 * Get safe user object for Redux store
 * @param {Object} firebaseUser - Firebase user object
 * @returns {Object} Safe user object with only serializable data
 */
export const getSafeUserObject = (firebaseUser) => {
  if (!firebaseUser) return null;

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  };
};