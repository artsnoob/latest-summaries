const fs = require('fs');
const path = require('path');

/**
 * Gets the most recent file from a directory based on its filename
 * Assumes filenames are in the format 'prefix20250323.md' (date in YYYYMMDD format)
 */
function getMostRecentFile(directory, prefix) {
    try {
        // Read all files in the directory
        const files = fs.readdirSync(directory);
        
        // Filter files that match the prefix and sort them by date (newest first)
        const relevantFiles = files
            .filter(file => file.startsWith(prefix) && file.endsWith('.md'))
            .sort((a, b) => {
                // Extract dates from filenames (assuming format prefix20250323.md)
                const dateA = a.substring(prefix.length, prefix.length + 8);
                const dateB = b.substring(prefix.length, prefix.length + 8);
                return dateB.localeCompare(dateA); // Sort in descending order
            });
        
        // Return the most recent file (first in the sorted array)
        if (relevantFiles.length > 0) {
            return path.join(directory, relevantFiles[0]);
        }
        
        return null;
    } catch (error) {
        console.error(`Error getting most recent file from ${directory}:`, error);
        return null;
    }
}

/**
 * Gets the content of a file
 */
function getFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

/**
 * Main function to get the latest summaries
 */
function getLatestSummaries() {
    const basePaths = {
        reddit: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/redditoutput/',
        rss: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/rssoutput/',
        twitter: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Twitter Scraper/twitteroutput/'
    };
    
    const prefixes = {
        reddit: 'reddit',
        rss: 'rss',
        twitter: 'twitter'
    };
    
    const result = {};
    
    // Get latest files
    Object.keys(basePaths).forEach(key => {
        const latestFile = getMostRecentFile(basePaths[key], prefixes[key]);
        if (latestFile) {
            const content = getFileContent(latestFile);
            if (content) {
                result[key] = {
                    path: latestFile,
                    content: content
                };
            }
        }
    });
    
    return result;
}

// If this file is run directly, output the latest summaries
if (require.main === module) {
    const summaries = getLatestSummaries();
    console.log(JSON.stringify(summaries, null, 2));
}

module.exports = {
    getLatestSummaries,
    getMostRecentFile,
    getFileContent
};
