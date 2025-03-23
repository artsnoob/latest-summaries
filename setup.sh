#!/bin/bash

# Display welcome message
echo "Setting up Latest Summaries Dashboard"
echo "===================================="
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

# Prompt for Gemini API key
echo ""
echo "You need a Gemini API key to use the AI overview feature."
echo "Get your API key from: https://ai.google.dev/"
echo ""
read -p "Enter your Gemini API key (leave blank to skip): " API_KEY

# Update the API key in the ai-service.js file
if [ ! -z "$API_KEY" ]; then
    echo "Updating API key in ai-service.js..."
    sed -i '' "s/const API_KEY = \".*\";/const API_KEY = \"$API_KEY\";/" ai-service.js
    echo "API key has been set."
else
    echo "API key not provided. You'll need to manually update the api-service.js file later."
fi

# Create directories
echo "Creating necessary directories..."
mkdir -p overviews

# Display completion message
echo ""
echo "Setup completed!"
echo "To start the server, run: npm start"
echo "Then open your browser to: http://localhost:3000"
