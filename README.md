# StyleFlow - Fashion E-Commerce Store

StyleFlow is a modern, responsive fashion e-commerce web application built with React and TypeScript. The store offers a seamless shopping experience with advanced filtering, product browsing, and an AI-powered styling assistant.

## Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse through a curated collection of fashion items including dresses, tops, pants, shoes, accessories, and sportswear
- **Category Navigation**: Easy navigation through product categories with visual category cards
- **Product Details**: View product information including prices, ratings, reviews, and images
- **Quick View Modal**: Preview products without leaving the main page
- **Shopping Cart**: Add items to cart, update quantities, and manage your selections

### 🔍 Advanced Filtering
- **Category Filtering**: Filter products by specific categories or view new arrivals
- **Price Range**: Set maximum price limits to find products within your budget
- **Rating Filter**: Filter products by minimum rating to find highly-rated items
- **Real-time Results**: See filtered product counts update instantly as you adjust filters

### 🤖 AI Styling Assistant
- **Gemini Integration**: Get personalized styling advice powered by Google's Gemini AI
- **Product Recommendations**: Receive fashion tips and styling suggestions for selected items

### 📱 Responsive Design
- **Mobile-First**: Fully optimized for mobile devices with a sticky bottom navigation
- **Desktop Experience**: Enhanced layout for larger screens with grid-based product display
- **RTL Support**: Right-to-left layout optimized for Hebrew language interface

### 🎨 Modern UI/UX
- **Clean Design**: Minimalist interface with focus on product presentation
- **Smooth Animations**: Polished transitions and hover effects
- **Visual Feedback**: Clear indicators for new products, discounts, and ratings

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Project Structure

```
mitch-store/
├── components/          # React components
│   ├── CartPage.tsx     # Shopping cart page
│   ├── CategoryNav.tsx  # Category navigation
│   ├── FilterBar.tsx    # Product filtering controls
│   ├── GeminiModal.tsx  # AI styling assistant modal
│   ├── Header.tsx       # Site header with cart icon
│   ├── ProductCard.tsx # Individual product card
│   └── QuickViewModal.tsx # Product quick view
├── services/            # Service modules
│   └── geminiService.ts # AI styling service
├── constants.ts         # Product and category data
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Deployment

The project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Features in Detail

### Product Management
- Products include title, price, original price (for discounts), images, ratings, and reviews
- Support for "New" product badges
- Automatic discount percentage calculation

### Cart Functionality
- Add products to cart with quantity selection
- Update item quantities
- Remove items from cart
- View cart total and item count

### Filtering System
- Multi-criteria filtering (category, price, rating)
- Clear filters option
- Real-time product count updates
- Mobile-friendly filter interface

## License

Private project - All rights reserved.

