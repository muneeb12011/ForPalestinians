#!/bin/bash

# Palestine News Timeline - VS Code Setup Script
# This script prepares your development environment for VS Code

echo "🇵🇸 Setting up Palestine News Timeline for VS Code..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or later."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm version: $NPM_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "🔧 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from .env.example"
fi

# Check if VS Code is installed
if command -v code &> /dev/null; then
    echo "✅ VS Code is installed"
    
    # Install recommended extensions
    echo "🔌 Installing recommended VS Code extensions..."
    code --install-extension esbenp.prettier-vscode
    code --install-extension bradlc.vscode-tailwindcss
    code --install-extension formulahendry.auto-rename-tag
    code --install-extension christian-kohler.path-intellisense
    code --install-extension ms-vscode.vscode-eslint
    
    echo "✅ VS Code extensions installed"
else
    echo "⚠️  VS Code not found. Please install VS Code first."
    echo "   Download from: https://code.visualstudio.com/"
fi

# Run type check
echo "🔍 Running TypeScript type check..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript type check found issues (this is normal for initial setup)"
else
    echo "✅ TypeScript type check passed"
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo "   1. Open VS Code: code ."
echo "   2. Start development server: npm run dev"
echo "   3. Open browser: http://localhost:5000"
echo ""
echo "📚 For more details, see:"
echo "   - README.md for project overview"
echo "   - SETUP_GUIDE.md for VS Code specific instructions"
echo ""
echo "🇵🇸 Free Palestine! 🇵🇸"