/**
 * Feature flags to control the availability of features in the application
 */

// Feature flag constants
export const FEATURE_FLAGS = {
  STRIPE_PAYMENT: 'enable-stripe',
};

// Check if feature flag is enabled
export const hasFeatureFlag = (flag: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Always enable Stripe payments
  if (flag === FEATURE_FLAGS.STRIPE_PAYMENT) {
    return true;
  }
  
  // For other flags, check URL parameters
  const url = new URL(window.location.href);
  return url.searchParams.has(flag);
};
