# Stripe Integration for your-website.example.com

This document provides comprehensive instructions for setting up, testing, and deploying the Stripe payment integration for donations on your-website.example.com.

## Overview

The Stripe integration allows visitors to donate using credit/debit cards, Apple Pay, and Google Pay, complementing the existing Malaysian payment methods (DuitNow Transfer, DuitNow QR, and Touch 'n Go eWallet).

The integration is implemented with a feature flag approach, allowing you to test and refine it before making it available to all users.

## Architecture

The integration consists of two main components:

1. **Frontend**: React components using Stripe Elements for secure payment form handling
2. **Backend**: Express.js server that communicates with the Stripe API

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Stripe account with API keys
- Basic understanding of React and Express.js

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your actual Stripe API keys:
   ```
   STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
   STRIPE_SECRET_KEY=your_secret_key_here
   PORT=3001
   CLIENT_URL=http://localhost:3000
   ```

### Frontend Setup

1. Update the Stripe publishable key in `src/components/Donation/StripePayment.tsx`:
   ```typescript
   const STRIPE_PUBLISHABLE_KEY = 'your_publishable_key_here';
   ```

## Running the Application

### Using the Start Script

Run both frontend and backend servers simultaneously using the provided script:

```
start-dev.bat
```

### Manual Start

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. In a separate terminal, start the frontend server:
   ```
   npm run dev
   ```

## Testing the Integration

1. Visit the donation page with the feature flag:
   ```
   http://localhost:3001/donate?enable-stripe
   ```

2. Select the Credit/Debit Card payment option

3. Test with Stripe test cards:
   - Success: XXXX-XXXX-XXXX-XXXX
   - Decline: XXXX-XXXX-XXXX-XXXX
   - Authentication required: XXXX-XXXX-XXXX-XXXX
   - Use any future date for expiry and any 3 digits for CVC

## Going Live

When you're ready to make the Stripe integration available to all users:

1. Update API URLs to use your production backend

2. Switch to production Stripe API keys

3. Remove the feature flag by updating:
   - `src/components/Donation/DonationModal.tsx`
   - `src/pages/static/DonatePage.tsx`

4. Set up Stripe webhooks for production:
   - Create a webhook endpoint in the Stripe Dashboard
   - Point it to your production server's webhook URL
   - Add the webhook signing secret to your server environment

## Security Considerations

- Never expose your Stripe secret key in frontend code
- Always use HTTPS in production
- Implement proper CORS configuration
- Validate all input on the server side
- Use Stripe Elements to ensure PCI compliance

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Ensure you're using the correct API keys for the environment (test/live)

2. **CORS Errors**: Check that your backend server is properly configured to allow requests from your frontend

3. **Payment Failures**: Use Stripe's dashboard to inspect payment attempts and identify issues

### Getting Help

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- React Stripe.js: https://stripe.com/docs/stripe-js/react

## Maintenance

- Regularly update the Stripe SDK to get the latest features and security updates
- Monitor Stripe's changelog for breaking changes
- Test the integration after any significant updates

## Credits

This integration was developed by YourName with assistance from Codeium.

