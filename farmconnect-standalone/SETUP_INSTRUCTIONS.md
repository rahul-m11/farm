# FarmConnect Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Git installed 
- A Google Gemini API key (for AI chat functionality)

## Quick Setup

1. **Extract/Clone the project**
   ```bash
   # If you received a ZIP file, extract it
   # If using git:
   git clone <repository-url>
   cd farmconnect-standalone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Google Gemini API key
   # Get your API key from: https://aistudio.google.com/app/apikey
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Backend API: http://localhost:5000
   - Frontend: Open a new terminal and run:
     ```bash
     cd client
     npm run dev
     ```
   - Then visit: http://localhost:3000

## What's Included

### ✅ Complete Features
- **Shopping Cart System** - Add/remove products, manage quantities
- **Google Pay Integration** - Checkout with seller contact details
- **Product Posting** - List your own products for sale
- **AI Chat Assistant** - Get farming advice via Google Gemini
- **Sample Data** - Pre-loaded products and tools for testing
- **Mobile Responsive** - Works great on all devices

### 📁 Project Structure
```
farmconnect-standalone/
├── client/              # React frontend application
├── server/              # Express.js backend API
├── shared/              # Shared TypeScript types
├── package.json         # Main dependencies
├── README.md           # Main documentation
└── .env.example        # Environment configuration template
```

## API Endpoints Available

- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/tools` - List farming tools
- `POST /api/chat` - Send message to AI assistant
- `GET /api/users/:id` - Get user details

## Troubleshooting

### Common Issues

**1. API Key Error in Chat**
- Make sure you've set `GEMINI_API_KEY` in your `.env` file
- Get your key from: https://aistudio.google.com/app/apikey
- Restart the server after adding the key

**2. Port Already in Use**
- Change the port in `.env`: `PORT=5001`
- Or kill existing processes: `lsof -ti:5000 | xargs kill`

**3. Missing Dependencies**
- Run: `npm install` to install all packages
- Clear cache if needed: `npm cache clean --force`

**4. TypeScript Errors**
- Run: `npm run build` to check for build errors
- Make sure all imports use the correct paths

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Build client only
npm run build:client

# Build server only
npm run build:server
```

## Environment Variables

Create a `.env` file with:

```
# Required for AI chat functionality
GEMINI_API_KEY=your_gemini_api_key

# Optional - defaults shown
PORT=5000
NODE_ENV=development

# Optional - for PostgreSQL (uses in-memory by default)
DATABASE_URL=postgresql://user:pass@localhost:5432/farmconnect
```

## Database

The application uses **in-memory storage** by default with sample data that includes:
- Sample farmers (John Smith, Maria Rodriguez)
- Sample products (tomatoes, apples, eggs, etc.)
- Sample tools (tractors, rototillers, irrigation systems)

For production, you can connect to PostgreSQL by setting the `DATABASE_URL` environment variable.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript + Node.js
- **AI**: Google Gemini 2.5 Flash for farming advice
- **Database**: In-memory storage (development) / PostgreSQL (production)
- **UI**: Shadcn/UI components with agricultural color scheme

## Support

If you encounter any issues:

1. Check this document for troubleshooting steps
2. Ensure all prerequisites are installed
3. Verify your environment variables are set correctly
4. Check the console for error messages

## License

MIT License - Feel free to modify and use for your projects!