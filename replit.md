# Overview

This is a full-stack agricultural marketplace application called "FarmConnect" that enables farmers to sell produce, rent equipment, and get AI-powered farming advice. The platform provides a React-based frontend with a modern component library, an Express.js backend with PostgreSQL database integration, and OpenAI integration for agricultural chatbot functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, marketplace, tools, and profile
- **State Management**: TanStack React Query for server state management and data fetching
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom agricultural color scheme (forest green, harvest orange, light green backgrounds)
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Framework**: Express.js with TypeScript in ESM format
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage Layer**: Abstract storage interface with in-memory implementation (IStorage/MemStorage pattern)
- **API Design**: RESTful API with dedicated routes for products, tools, rentals, and chat
- **Middleware**: JSON parsing, URL encoding, request logging, and error handling

## Database Schema
- **Users**: Farmer profiles with authentication credentials, contact info, and farm details
- **Products**: Agricultural produce listings with pricing, categories, organic certification, and ratings
- **Tools**: Equipment rental listings with daily rates, availability status, and location
- **Rentals**: Tool rental transactions linking renters to tools with date ranges and costs
- **Chat Messages**: AI conversation history with session-based organization

## Key Features
- **Product Marketplace**: Search, filter, and browse agricultural products by category and location
- **Tool Rental System**: Equipment sharing platform with availability tracking and reservation management
- **AI Chat Assistant**: OpenAI GPT-4o integration for farming advice and guidance
- **User Profiles**: Farmer dashboard for managing product listings and rental history
- **Real-time Updates**: React Query for optimistic updates and cache management

## Design Patterns
- **Repository Pattern**: Abstract storage interface allows for easy database implementation swapping
- **Component Composition**: Reusable UI components with props-based customization
- **Form Validation**: Schema-driven validation using Zod for both client and server-side validation
- **Error Handling**: Centralized error handling with toast notifications and proper HTTP status codes

# External Dependencies

## Database
- **PostgreSQL**: Primary database with Neon serverless integration
- **Drizzle Kit**: Database migrations and schema management

## Authentication & Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## AI Services
- **Google Gemini API**: Gemini 2.5 Flash model for agricultural advice chatbot functionality

## Frontend Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with performance optimization
- **Date-fns**: Date manipulation and formatting utilities

## Development Tools
- **Vite**: Fast development server and build tool with HMR
- **TSX**: TypeScript execution for development server
- **ESBuild**: Production bundling for server-side code
- **Replit Integration**: Development environment plugins and error handling