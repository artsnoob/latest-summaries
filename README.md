# Latest Summaries Dashboard

A simple dashboard that displays the latest content from your Reddit, RSS, and Twitter summary files.

## Features

- Displays content from three sources:
  - Reddit summaries
  - RSS feed summaries
  - Twitter summaries
- Responsive design with cards for each article/post
- Shows the date when each source was last updated

## Setup

1. Install dependencies:
```bash
npm install express
```

2. Start the server:
```bash
node server.js
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## How It Works

- The application scans the specified directories to find the most recent summary files
- It parses the markdown content and extracts the relevant information
- The content is displayed in an aesthetically pleasing card layout
- Each card includes a link to the original content

## File Structure

- `index.html` - Main HTML file
- `style.css` - Styling for the dashboard
- `app.js` - Original client-side JavaScript (using direct file access)
- `updated-app.js` - Updated client-side JavaScript (using API)
- `backend.js` - Server-side logic for finding and parsing files
- `server.js` - Express server for serving the application

## Paths

The application looks for files in these locations:

1. Reddit summaries: `/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/redditoutput/`
2. RSS feed summaries: `/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/rssoutput/`
3. Twitter summaries: `/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Twitter Scraper/twitteroutput/`

## Using the Dashboard

1. Start the server
2. Browse the latest content from each source
3. Click on any card to view the original content
