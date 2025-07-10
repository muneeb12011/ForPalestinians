# Palestine News Timeline Application

## Overview

This is a full-stack TypeScript application that serves as a news timeline platform focused on Palestine-related content. The application provides real-time updates, content filtering, and categorization of news items including breaking news, analysis, official quotes, and timeline events.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with React plugin
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Real-time**: WebSocket server for live updates
- **Session Management**: connect-pg-simple for PostgreSQL sessions

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password
- **Posts Table**: Content storage with fields for title, content, type, source, author, tags, view count, and timestamps
- **Content Types**: breaking, analysis, quote, timeline
- **Tags**: Array-based tagging system for content categorization

### API Structure
- **RESTful endpoints** for CRUD operations on posts
- **WebSocket endpoint** (`/ws`) for real-time updates
- **Filtering capabilities** by type, date range, source, and search terms
- **Statistics endpoint** for dashboard metrics

### Frontend Components
- **Header**: Search functionality and branding
- **FilterBar**: Content filtering by type, date, and source
- **Timeline**: Main content display with post cards
- **Sidebar**: Statistics, recent quotes, and content management
- **AddContentModal**: Form for creating new posts
- **Real-time Updates**: WebSocket integration for live content

## Data Flow

1. **Content Creation**: Users create posts through the AddContentModal
2. **Real-time Broadcasting**: New posts are broadcast to all connected clients via WebSocket
3. **Content Filtering**: Users can filter content by type, date range, and search terms
4. **Statistics Display**: Real-time statistics are calculated and displayed in the sidebar
5. **View Tracking**: Post views are tracked and incremented when accessed

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM with TypeScript support
- **express**: Web server framework
- **ws**: WebSocket implementation
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Comprehensive UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS variant management
- **date-fns**: Date manipulation utilities
- **lucide-react**: Icon library

## Deployment Strategy

### Development
- **Hot Module Replacement**: Vite dev server with HMR
- **TypeScript Compilation**: Real-time type checking
- **Database Migrations**: Drizzle Kit for schema management
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Static Serving**: Express serves built frontend files in production
- **Database**: PostgreSQL with connection pooling via Neon

### Key Features
- **Real-time Updates**: WebSocket connections for live content updates
- **Content Management**: Full CRUD operations for news content
- **Advanced Filtering**: Multi-criteria content filtering and search
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Dark Theme**: Consistent dark theme throughout the application

The application uses a modern tech stack optimized for real-time news delivery with a focus on user experience and content management capabilities.

## VS Code Setup

### Quick Start for VS Code
1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev`
3. **Open Browser**: `http://localhost:5000`

### Setup Script
Run the automated setup script:
```bash
chmod +x setup-vscode.sh
./setup-vscode.sh
```

### VS Code Extensions
The project includes configuration for these recommended extensions:
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense
- ESLint

### Configuration Files
- `.vscode/settings.json`: TypeScript and formatting preferences
- `.vscode/extensions.json`: Recommended extensions list
- `.vscode/launch.json`: Debug configurations
- `.env.example`: Environment variables template

### Debugging
Use F5 to debug with:
- "Launch Palestine News App": Full app with debugger
- "Debug Server": Server-only debugging

### Common Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run type-check`: Check TypeScript types
- `npx kill-port 5000`: Kill port 5000 if in use

The application is now optimized for VS Code development with proper TypeScript support, debugging capabilities, and automated setup scripts.