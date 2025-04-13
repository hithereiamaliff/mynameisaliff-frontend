# Donation Components

This directory contains components for handling donations through various payment methods, including:

- DuitNow Transfer
- DuitNow QR
- Touch 'n Go eWallet
- Credit/Debit Card payments via Stripe

## Components Overview

### DonationModal

A modal component that presents users with different payment options. It includes:
- Payment method selection
- Feature flag support for Stripe payments
- Analytics tracking for user interactions

```tsx
import { DonationModal } from './components/Donation/DonationModal';

// Usage example
const [isModalOpen, setIsModalOpen] = useState(false);

<button onClick={() => setIsModalOpen(true)}>
  Support My Work
</button>

<DonationModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
```

### Payment Method Components

#### DuitNow Transfer
Displays bank account details for direct transfers with support for opening Malaysian banking apps.

#### DuitNow QR
Displays a QR code that can be scanned with banking apps, with support for both Malaysian and international payment apps.

#### Touch 'n Go eWallet
Provides a QR code and direct link for Touch 'n Go eWallet payments.

#### StripePayment
Handles credit/debit card payments through Stripe, including:
- Amount selection
- Secure payment processing
- Success/failure handling
- Analytics tracking

## Stripe Integration

The Stripe integration is conditionally enabled using a feature flag. To enable Stripe payments, add the query parameter `?enable-stripe` to the URL.

### Backend Requirements

The Stripe integration requires backend endpoints:
- `/api/stripe-config` - Returns the Stripe publishable key
- `/api/create-payment-intent` - Creates a payment intent for processing payments

### Environment Variables

The frontend uses these environment variables for Stripe integration:
- `VITE_BACKEND_URL` - The URL of the backend API

## Analytics

All donation interactions are tracked using Google Analytics 4 (GA4), including:
- Modal opens
- Payment method selections
- Amount selections
- Successful/failed payments

## Security Considerations

- Sensitive information (API keys, account numbers) is never hardcoded in the frontend
- All payment processing is handled securely through the backend
- Stripe Elements is used to securely collect card information

## Adding to a Page

```tsx
import { DonatePage } from './pages/static/DonatePage';

// In router.tsx
{
  path: '/donate',
  element: <DonatePage />,
}
```

The DonatePage component provides a standalone page for donations with all payment methods.
