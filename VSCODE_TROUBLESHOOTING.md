# VS Code Troubleshooting Guide

## Common Issues and Solutions

### 1. "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 2. Port 5000 already in use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Option 1: Kill the process using port 5000
npx kill-port 5000

# Option 2: Find and kill manually
lsof -ti:5000 | xargs kill -9

# Option 3: Use a different port
PORT=3000 npm run dev
```

### 3. TypeScript errors in VS Code

**Solution:**
```bash
# Restart TypeScript language service
# In VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or check types manually
npx tsc --noEmit
```

### 4. WebSocket connection fails

**Symptoms:** Real-time updates not working, console shows WebSocket errors

**Solution:**
- Make sure the server is running on port 5000
- Check if firewall is blocking WebSocket connections
- Restart the development server

### 5. Import path errors

**Error:** `Cannot resolve module '@/components/...'`

**Solution:**
- Install VS Code extension: "TypeScript and JavaScript Language Features"
- Restart VS Code
- Check that `tsconfig.json` includes the path mappings

### 6. Tailwind CSS not working

**Symptoms:** CSS classes not applying, no IntelliSense

**Solution:**
```bash
# Install Tailwind VS Code extension
code --install-extension bradlc.vscode-tailwindcss

# Check that tailwind.config.ts exists
# Restart VS Code
```

### 7. Hot reload not working

**Symptoms:** Changes not reflected in browser

**Solution:**
- Save the file (Ctrl+S)
- Check terminal for compilation errors
- Restart development server: `Ctrl+C` then `npm run dev`
- Clear browser cache and reload

### 8. Database-related errors

**Error:** Database connection issues

**Solution:**
This app uses in-memory storage, so no database setup required. If you see database errors:
- Check that `server/storage.ts` is properly configured
- Restart the server

### 9. VS Code extensions not loading

**Solution:**
```bash
# Reinstall extensions
code --list-extensions | xargs -L 1 echo code --install-extension

# Or install manually:
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### 10. Environment variables not loading

**Solution:**
```bash
# Create .env file from template
cp .env.example .env

# Or create manually with:
echo "NODE_ENV=development" > .env
echo "PORT=5000" >> .env
```

## VS Code Settings Issues

### IntelliSense not working

1. Open VS Code settings (Ctrl+,)
2. Search for "typescript suggest"
3. Enable "TypeScript › Suggest: Auto Imports"

### Formatting not working

1. Install Prettier extension
2. Set as default formatter:
   - Ctrl+Shift+P → "Preferences: Open Settings (JSON)"
   - Add: `"editor.defaultFormatter": "esbenp.prettier-vscode"`

### Auto-import not working

Check `.vscode/settings.json` contains:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.includePackageJsonAutoImports": "off"
}
```

## Performance Issues

### VS Code running slowly

1. Disable unnecessary extensions
2. Increase VS Code memory limit:
   - Add to VS Code settings: `"typescript.preferences.includePackageJsonAutoImports": "off"`
3. Close unused tabs and files

### Build taking too long

```bash
# Clear build cache
rm -rf node_modules/.vite
rm -rf dist

# Restart development server
npm run dev
```

## Debug Issues

### Breakpoints not working

1. Make sure you're running the debug configuration (F5)
2. Check that source maps are enabled
3. Verify the debug configuration in `.vscode/launch.json`

### Console.log not showing

- Check the Debug Console in VS Code
- Or check the browser developer tools console

## Final Steps

If none of the above solutions work:

1. **Restart VS Code completely**
2. **Restart your computer**
3. **Reinstall Node.js** (if the issue persists)
4. **Check the VS Code output panel** for detailed error messages

## Getting Help

1. Check the terminal output for specific error messages
2. Check the browser console (F12)
3. Look at the VS Code problems panel (Ctrl+Shift+M)
4. Search for the specific error message online

## Palestine News Timeline Specific

Remember this app is designed to:
- Amplify Palestinian voices
- Show real-time news updates
- Expose media bias and propaganda
- Provide historical context of occupation

Keep the focus on Palestinian perspective when adding content or making changes.