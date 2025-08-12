# FarmConnect - Agricultural Marketplace

A comprehensive full-stack agricultural marketplace platform where farmers can sell products, rent equipment, and get AI-powered farming advice.

## Features

- 🛒 **Shopping Cart System** - Add products, manage quantities, checkout with Google Pay
- 📝 **Product Posting** - Anyone can list their products for sale
- 💳 **Google Pay Integration** - Secure payments with seller contact details
- 🤖 **AI Chat Assistant** - Farming advice powered by Google Gemini
- 🌱 **Sample Data** - Pre-loaded with products and tools for testing
- 📱 **Mobile-First Design** - Responsive Airbnb-inspired layout

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn/UI
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **AI**: Google Gemini 2.5 Flash
- **Database**: PostgreSQL (with in-memory fallback for development)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

## Environment Variables

Create a `.env` file in the root directory:

```
GEMINI_API_KEY=your_google_gemini_api_key_here
DATABASE_URL=your_postgresql_url_if_using_db
NODE_ENV=development
```

## Project Structure

```
farmconnect-standalone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML template
├── server/                # Express backend
│   ├── services/          # External service integrations
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types and schemas
└── package.json           # Dependencies and scripts
```

## Key Features Usage

### Shopping Cart
- Browse products on homepage or marketplace
- Click "Add to Cart" on any product
- View cart via floating cart icon
- Proceed to checkout with Google Pay

### Product Posting
- Click "Sell Your Product" in navigation
- Fill out product details form
- Submit to list on marketplace immediately

### AI Chat Assistant
- Click chat bubble in bottom right
- Ask farming-related questions
- Get expert advice from Google Gemini

### Google Pay Checkout
- Add items to cart and checkout
- Review seller contact information
- Pay via Google Pay integration
- Contact sellers for delivery arrangements

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Color Scheme

- **Forest Green**: #2E7D32 (Primary)
- **Harvest Orange**: #FFA726 (Secondary) 
- **Light Green**: #F1F8E9 (Background)
- **Dark Green**: #1B5E20 (Text)

## API Endpoints

- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/tools` - List tools  
- `POST /api/chat` - Send chat message
- `GET /api/users/:id` - Get user details

## License

MIT License - See LICENSE file for details