# Latest Summaries Dashboard

A dashboard application that displays summaries from different content sources (Reddit, RSS feeds, and Twitter) and generates AI overviews.

## Features

- Display the latest summaries from Reddit, RSS feeds, and Twitter
- Tab-based navigation between different content sources
- Responsive design for desktop and mobile devices
- AI-powered overview generation using Google Gemini 2.0 Flash

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/latest-summaries.git
   cd latest-summaries
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Gemini API key (choose one method):

   **Method 1: Use the setup script**
   ```bash
   chmod +x setup-api-key.sh
   ./setup-api-key.sh
   ```
   
   **Method 2: Edit the config file manually**
   - Get an API key from the [Google AI Studio](https://ai.google.dev/)
   - Open `config.js` and replace `YOUR_GEMINI_API_KEY` with your actual API key
   
   **Method 3: Use an environment variable**
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   npm start
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Navigate between different content sections using the tabs

4. To generate an AI overview:
   - Click on the "AI Overview" tab in the navigation bar, or
   - Click the "Generate AI Overview" button in the footer
   - On the overview page, click "Generate New Overview" to create a new AI-generated summary

## Project Structure

- `app.js` - Client-side JavaScript for parsing and displaying content
- `backend.js` - Server-side functions for retrieving content files
- `server.js` - Express server setup and API endpoints
- `ai-service.js` - Integration with the Google Gemini API
- `index.html` - Main dashboard page
- `overview.html` - AI overview page
- `style.css` - Styling for the application

## AI Overview Feature

The AI overview feature uses Google's Gemini 2.0 Flash model to generate insights from all your content sources. The application:

1. Collects content from Reddit, RSS feeds, and Twitter
2. Sends the content to the Gemini API for analysis
3. Displays the AI-generated overview on a dedicated page
4. Saves the overview for future reference

Generated overviews are saved in the `overviews` directory as markdown files.

## License

MIT
