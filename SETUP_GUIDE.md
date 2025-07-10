# VS Code Setup Guide for Palestine News Timeline

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Run the application
npm run dev

# 3. Open in browser
# http://localhost:5000
```

## VS Code Extensions to Install

Open VS Code Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run:

```
Extensions: Install Extensions
```

Install these extensions:

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
3. **TypeScript and JavaScript Language Features** (built-in)
4. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
5. **Path Intellisense** (`christian-kohler.path-intellisense`)

## Terminal Commands for VS Code

### Open Integrated Terminal
- Press `Ctrl+`` (backtick) or `Cmd+`` on Mac
- Or use: View → Terminal

### Run the App
```bash
npm run dev
```

### Stop the App
- Press `Ctrl+C` in the terminal

## Common Issues & Solutions

### 1. Port Already in Use
```bash
# Find and kill process using port 5000
npx kill-port 5000
# Then restart
npm run dev
```

### 2. Node Modules Issues
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3. TypeScript Errors
```bash
# Check for TypeScript errors
npx tsc --noEmit
```

### 4. Cannot Find Module Errors
Make sure all dependencies are installed:
```bash
npm install
```

## VS Code Debugging

### Debug with Breakpoints
1. Open the file you want to debug
2. Click on the left margin to set breakpoints
3. Press `F5` or go to Run → Start Debugging
4. Select "Launch Palestine News App"

### Debug Server Only
1. Press `F5`
2. Select "Debug Server"
3. Set breakpoints in server files

## File Structure Overview

```
palestine-news-timeline/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Backend (Express + TypeScript)
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared types
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open in Browser**
   - Go to `http://localhost:5000`

3. **Make Changes**
   - Edit files in `client/src/` or `server/`
   - Changes auto-reload

4. **Add New Content**
   - Use the "Add Update" button
   - Or modify sample data in `server/storage.ts`

## Key Features

### Real-time Updates
- WebSocket connection for live updates
- New posts appear automatically

### Content Types
- **Breaking News**: Red indicator, urgent updates
- **Analysis**: Blue indicator, in-depth content
- **Quotes**: Yellow indicator, official statements
- **Timeline**: Green indicator, historical events

### Filtering
- Filter by content type
- Date range filtering
- Source filtering
- Text search

## Customization

### Add New Sample Data
Edit `server/storage.ts` in the `initializeSampleData()` function.

### Modify Theme Colors
Edit `client/src/index.css` to change colors.

### Add New API Endpoints
Edit `server/routes.ts` to add new API routes.

## Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Getting Help

If you encounter issues:

1. Check the terminal for error messages
2. Look at the browser console (F12 → Console)
3. Restart the development server (`Ctrl+C` then `npm run dev`)
4. Clear browser cache and reload

## Palestine Focus

This app is designed to amplify Palestinian voices and perspectives:
- Content focuses on Palestinian experience
- Exposes media bias and propaganda
- Highlights international law violations
- Provides historical context of occupation