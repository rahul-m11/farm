# FarmConnect - Agricultural Marketplace Code Documentation

## Overview
A comprehensive full-stack agricultural marketplace platform that enables farmers to sell products, rent equipment, and get AI-powered farming advice. Features include shopping cart functionality, Google Pay integration, product posting, and WhatsApp-style AI chat.

## Key Features Implemented

### 1. Shopping Cart System
- **Cart Widget** (`client/src/components/cart-widget.tsx`)
  - Floating cart button with item count badge
  - Expandable cart panel showing all items
  - Quantity adjustment (plus/minus buttons)
  - Item removal functionality
  - Real-time total calculation

### 2. Product Posting Feature
- **Add Product Modal** (`client/src/components/add-product-modal.tsx`)
  - Complete form with all product fields
  - Category selection dropdown
  - Organic certification toggle
  - Image URL input
  - Stock and location tracking
  - Form validation using Zod

### 3. Google Pay Integration
- **Checkout Modal** (`client/src/components/checkout-modal.tsx`)
  - Order summary grouped by seller
  - Seller contact information display
  - Google Pay URL generation
  - Automatic cart clearing
  - Payment flow notifications

### 4. AI Chat Assistant
- **Chat Widget** (`client/src/components/chat-widget.tsx`)
  - WhatsApp-style interface
  - Google Gemini 2.5 Flash integration
  - Session-based conversations
  - Typing indicators and animations

### 5. Sample Data System
- **Storage Layer** (`server/storage.ts`)
  - Comprehensive sample products (tomatoes, apples, eggs, etc.)
  - Sample tools (tractors, rototillers, irrigation systems)
  - Sample farmers with contact details
  - Automatic initialization on startup

## Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **TanStack React Query** for data fetching
- **Wouter** for client-side routing
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL schema
- **In-memory storage** for development
- **Google Gemini API** for AI chat

### Key Dependencies
```json
{
  "@google/genai": "^latest",
  "@tanstack/react-query": "^latest",
  "@radix-ui/react-*": "^latest",
  "wouter": "^latest",
  "drizzle-orm": "^latest",
  "zod": "^latest"
}
```

## File Structure
```
├── client/src/
│   ├── components/
│   │   ├── cart-widget.tsx          # Shopping cart functionality
│   │   ├── checkout-modal.tsx       # Google Pay integration
│   │   ├── add-product-modal.tsx    # Product posting form
│   │   ├── chat-widget.tsx          # AI chat interface
│   │   ├── navigation.tsx           # Top navigation bar
│   │   ├── product-card.tsx         # Product display cards
│   │   └── ui/                      # Reusable UI components
│   ├── hooks/
│   │   ├── use-cart.tsx            # Cart state management
│   │   ├── use-toast.ts            # Toast notifications
│   │   └── use-mobile.tsx          # Mobile detection
│   ├── pages/
│   │   ├── home.tsx                # Homepage with products
│   │   ├── marketplace.tsx         # Full marketplace view
│   │   ├── tools.tsx               # Tool rental section
│   │   └── profile.tsx             # User profile
│   └── lib/
│       ├── queryClient.ts          # API client setup
│       └── utils.ts                # Utility functions
├── server/
│   ├── services/
│   │   └── gemini.ts               # Google Gemini integration
│   ├── index.ts                    # Express server setup
│   ├── routes.ts                   # API endpoints
│   ├── storage.ts                  # Data storage layer
│   └── vite.ts                     # Vite development server
├── shared/
│   └── schema.ts                   # Database schema & types
└── replit.md                       # Project documentation
```

## Color Scheme
- **Forest Green**: #2E7D32 (primary buttons, accents)
- **Harvest Orange**: #FFA726 (secondary actions, highlights)  
- **Light Green Background**: #F1F8E9 (page backgrounds)
- **Dark Green Text**: #1B5E20 (primary text)

## API Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/search?q=query` - Search products

### Tools
- `GET /api/tools` - List all tools
- `GET /api/tools/available` - List available tools
- `POST /api/tools` - Create new tool

### Users
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create new user

### Chat
- `GET /api/chat/:sessionId` - Get chat history
- `POST /api/chat` - Send chat message

## Environment Variables
```
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_postgres_url (if using PostgreSQL)
```

## Usage Instructions

### Adding Products to Cart
1. Browse products on homepage or marketplace
2. Click "Add to Cart" on any product card
3. View cart by clicking the floating cart icon
4. Adjust quantities or remove items as needed

### Posting New Products
1. Click "Sell Your Product" in navigation
2. Fill out the product form
3. Set price, category, and description
4. Toggle organic certification if applicable
5. Submit to list immediately on marketplace

### Google Pay Checkout
1. Add items to cart
2. Click "Proceed to Checkout"
3. Review order and seller contact information
4. Click "Pay with Google Pay"
5. Complete payment in Google Pay
6. Contact sellers directly using provided details

### AI Chat Assistant
1. Click the chat bubble in bottom right
2. Ask farming-related questions
3. Get advice powered by Google Gemini
4. Chat history is maintained per session

## Development Setup
```bash
npm install
npm run dev
```

## Deployment Notes
- Uses Replit's deployment system
- Supports PostgreSQL for production
- Environment variables configured in Replit secrets
- Automatic HTTPS and custom domains available

This codebase provides a complete, production-ready agricultural marketplace platform with modern web technologies and comprehensive features for farmers and buyers.