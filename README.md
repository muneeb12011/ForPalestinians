# Palestine News Timeline Application

A real-time news timeline platform focused on Palestinian perspective with WebSocket updates and dark theme.

## Features

- **Real-time Updates**: WebSocket connections for live news posting
- **Timeline Interface**: Breaking news, analysis, quotes, and timeline events
- **Palestinian Perspective**: Content exposing media bias and occupation
- **Dark Theme**: Optimized for news consumption
- **Content Management**: Add, filter, and search news content
- **Statistics Dashboard**: Live metrics and trending topics

## Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **VS Code** (recommended)

## Installation & Setup

### 1. Clone/Download the Project

```bash
git clone <your-repo-url>
cd palestine-news-timeline
```

### 2. Install Dependencies

```bash
npm install
```

### 3. VS Code Setup

Install the following VS Code extensions for the best development experience:

- **TypeScript and JavaScript Language Features** (built-in)
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**

### 4. Environment Configuration

Create a `.env` file in the root directory (if needed for production):

```env
NODE_ENV=development
PORT=5000
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start:
- Express server on port 5000
- Vite development server with hot reload
- WebSocket server for real-time updates

### Production Mode

```bash
npm run build
npm start
```

## Project Structure

```
palestine-news-timeline/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # In-memory data storage
│   └── vite.ts           # Vite integration
├── shared/               # Shared TypeScript types
└── package.json
```

## API Endpoints

- `GET /api/posts` - Get all posts with filtering
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `GET /api/stats` - Get platform statistics
- `WebSocket /ws` - Real-time updates

## Features Overview

### Content Types
- **Breaking News**: Urgent updates with red indicators
- **Analysis**: In-depth examination of events
- **Quotes**: Official statements and responses
- **Timeline**: Historical context and events

### Filtering Options
- Filter by content type
- Date range filtering
- Source filtering
- Text search across all content

### Real-time Features
- Live WebSocket connections
- Automatic content updates
- Real-time statistics
- Instant notifications for breaking news

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 5000
   npx kill-port 5000
   ```

2. **Dependencies Issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript Errors**
   ```bash
   # Check TypeScript compilation
   npx tsc --noEmit
   ```

4. **Build Issues**
   ```bash
   # Clean build
   rm -rf dist
   npm run build
   ```

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## Development Workflow

1. Start the development server: `npm run dev`
2. Open http://localhost:5000 in your browser
3. Make changes to the code
4. The app will automatically reload with hot module replacement

## Contributing

1. Focus on Palestinian perspective in content
2. Maintain real-time functionality
3. Keep the dark theme consistent
4. Add proper TypeScript types for new features
5. Test WebSocket connections thoroughly

## License

This project is dedicated to amplifying Palestinian voices and perspectives.