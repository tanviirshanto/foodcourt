# Food Court - Online Food Ordering App

Food Court is a modern online food ordering platform where users can browse a variety of restaurants, select dishes, and order food with ease. The app provides a seamless user experience with the convenience of two payment methods: Stripe and SSLCommerz. This app is built with Next.js, Redux Toolkit for state management, MongoDB for database, and styled using Tailwind CSS.

## Features

- **Restaurant Listings:** Browse through a variety of restaurants and their available dishes.
- **Food Ordering:** Add items to the cart and place orders with ease.
- **User Authentication:** Register, log in, and manage your account.
- **Payment Integration:** Secure payments via Stripe and SSLCommerz.
- **Modern UI/UX:** A sleek and user-friendly interface built with Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **State Management:** Redux Toolkit
- **Backend:** Next.js, MongoDB (Database)
- **Payment Gateways:** Stripe, SSLCommerz
- **Authentication:** JWT-based login and registration system

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanviirshanto/foodcourt.git
   ```
2. Navigate to the project folder:
   ```bash
   cd foodcourt
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (add your Stripe and SSLCommerz keys in `.env.local`):
   ```
   MONGO_URI=your_mongodb_database_url
   NEXT_PUBLIC_BASE_URL=base_url
   MAILTRAP_PASSWORD=your_mailtrap_password
   STRIPE_SECRET=your_stripe_secret_key
   SECRET=your_secret_key
   SSLC_STORE_ID=your_sslcommerz_store_id
   SSLC_STORE_PASSWORD=your_sslcommerz_store_password
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Screenshots

| Mobile View                                                            | Desktop View                                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Home - Mobile View](./screenshots/home-mobile.png)                   | ![Home - Desktop View](./screenshots/home-desktop.png)                   |
| ![Top Picks - Mobile View](./screenshots/top_picks-mobile.png)         | ![Top Picks - Desktop View](./screenshots/top_picks-desktop.png)         |
| ![Restaurants - Mobile View](./screenshots/restaurants-mobile.png)     | ![Restaurants - Desktop View](./screenshots/restaurants-desktop.png)     |
| ![Reviews - Mobile View](./screenshots/reviews-mobile.png)             | ![Reviews - Desktop View](./screenshots/reviews-desktop.png)             |
| ![Cart - Mobile View](./screenshots/cart-mobile.png)                   | ![Cart - Desktop View](./screenshots/cart-desktop.png)                   |
| ![Order Details - Mobile View](./screenshots/order_details-mobile.png) | ![Order Details - Desktop View](./screenshots/order_details-desktop.png) |
| ![Payment - Mobile View](./screenshots/payment-mobile.png)             | ![Payment - Desktop View](./screenshots/payment-desktop.png)             |
| ![Profile - Mobile View](./screenshots/profile-mobile.png)             | ![Profile - Desktop View](./screenshots/profile-desktop.png)             |
| ![Register - Mobile View](./screenshots/register-mobile.png)           | ![Register - Desktop View](./screenshots/register-desktop.png)           |
| ![Login - Mobile View](./screenshots/login-mobile.png)                 | ![Login - Desktop View](./screenshots/login-desktop.png)                 |
| ![Stripe Payment - Mobile View](./screenshots/stripe-mobile.png)       | ![SSLCommerz Payment - Desktop View](./screenshots/sslcommerz.png)       |
| ![View Order - Mobile View](./screenshots/view_order-mobile.png)       | ![View Order - Desktop View](./screenshots/view_order-desktop.png)       |


## Live Demo

You can check the live version of the app at:
[FoodCourt - Live Demo](https://foodcourt-two.vercel.app/)

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
