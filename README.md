
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
![Home](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max) (2).png>) ![Home](<foodcourt-two.vercel.app_register(Nest Hub Max) (2).png>)
![Top Picks](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max) (3).png>) ![Top Picks](<foodcourt-two.vercel.app_register(Nest Hub Max) (3).png>)
![Restaurants](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max) (4).png>) ![Restaurants](<foodcourt-two.vercel.app_register(Nest Hub Max) (4).png>)
![Reviews](<foodcourt-two.vercel.app_register(Nest Hub Max) (5).png>)
![Footer](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max) (5).png>) ![Footer](<foodcourt-two.vercel.app_register(Nest Hub Max) (6).png>)
![All Items](<foodcourt-two.vercel.app_items_page=1(iPhone 14 Pro Max).png>) ![All Items](<foodcourt-two.vercel.app_items_page=1(Nest Hub Max).png>)
![Cart](<foodcourt-two.vercel.app_(iPhone 14 Pro Max).png>) ![Cart](<foodcourt-two.vercel.app_(Nest Hub Max).png>)
![Order details](<foodcourt-two.vercel.app_(iPhone 14 Pro Max) (2).png>) ![Order details](<foodcourt-two.vercel.app_(Nest Hub Max) (2).png>)
![View Order](<foodcourt-two.vercel.app_checkout_66237a2e725f8c119a4e9a54_694ac6b4e925a7a87fb9e131(iPhone 14 Pro Max) (1).png>) ![View Order](<foodcourt-two.vercel.app_checkout_66237a2e725f8c119a4e9a54_694ac6b4e925a7a87fb9e131(Nest Hub Max) (1).png>)
![Payment](<foodcourt-two.vercel.app_(iPhone 14 Pro Max) (3).png>) ![Payment](<foodcourt-two.vercel.app_(Nest Hub Max) (4).png>)
![Stripe Payment](<checkout.stripe.com_c_pay_cs_test_b1uZR7BfbLYjuXqVdA7CglnVxP1ImdZQUJeiGk9IgXGYXO9m5gvSE0cghX(iPhone 14 Pro Max).png>)
![bKash Payment](<sandbox.sslcommerz.com_EasyCheckOut_testcde885c916056ee4df3bfb44945d1d0e847(iPhone 14 Pro Max).png>)
![Profile](<foodcourt-two.vercel.app_checkout_66237a2e725f8c119a4e9a54_694ac6b4e925a7a87fb9e131(iPhone 14 Pro Max).png>) ![Profile](<foodcourt-two.vercel.app_checkout_66237a2e725f8c119a4e9a54_694ac6b4e925a7a87fb9e131(Nest Hub Max).png>)
![Register](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max).png>)
![Login](<foodcourt-two.vercel.app_register(iPhone 14 Pro Max) (1).png>)

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
