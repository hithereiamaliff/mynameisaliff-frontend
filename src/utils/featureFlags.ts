/**
 * Feature flags to control the availability of features in the application
 */

// Check if URL contains the specified feature flag
export const hasFeatureFlag = (flag: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const url = new URL(window.location.href);
  return url.searchParams.has(flag);
};

// Feature flag constants
export const FEATURE_FLAGS = {
  STRIPE_PAYMENT: 'enable-stripe',
};
