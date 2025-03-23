/**
 * Configuration settings for the Latest Summaries app
 * Edit this file to configure the application
 */

// Gemini API key settings
// Replace 'YOUR_GEMINI_API_KEY' with your actual API key from https://ai.google.dev/
const config = {
    // Gemini API key
    geminiApiKey: 'AIzaSyA0q9j3rX1eJKG2ua_IraYS-NJkYk_obGE',
    
    // Paths to the latest files (automatically updated by the application)
    paths: {
        reddit: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/redditoutput/reddit20250323.md',
        rss: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/rssoutput/rss20250323.md',
        twitter: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Twitter Scraper/twitteroutput/twitter20250323.md'
    }
};

module.exports = config;
