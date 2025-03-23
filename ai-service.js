const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

// Initialize the Gemini API client
const API_KEY = config.geminiApiKey;

// Check if API key is configured
if (API_KEY === 'YOUR_GEMINI_API_KEY') {
    console.warn('WARNING: Gemini API Key not configured. Please set it in config.js or via the GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generates an AI overview of the provided content using Gemini 2.0 Flash
 * @param {Object} summaries - Object containing content from different sources
 * @returns {Promise<string>} - The AI-generated overview
 */
async function generateOverview(summaries) {
    try {
        // Initialize the model (Gemini 2.0 Flash model)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        // Create a structured prompt for the AI
        let prompt = `Analyze the following content from various sources and create a comprehensive overview:

2. Identify the most significant trends, announcements, and developments
3. Group the information into logical categories (like "New AI Models", "Hardware Advancements", "Corporate News", etc.)
4. Include direct links to original sources where available

For the final summary:
1. Create a well-organized report with clear section headings
2. Prioritize information based on significance and cross-source validation
3. Highlight emerging trends that appear across multiple sources
4. Include one representative link per significant news item
5. Keep the summary concise yet comprehensive

For Twitter/Nitter links specifically, please make them clickable in the format: [Tweet Link](URL)

Content to analyze:

`;
        
        // Add Reddit content
        if (summaries.reddit && summaries.reddit.content) {
            prompt += "## REDDIT CONTENT\n" + summaries.reddit.content + "\n\n";
        }
        
        // Add RSS content
        if (summaries.rss && summaries.rss.content) {
            prompt += "## RSS CONTENT\n" + summaries.rss.content + "\n\n";
        }
        
        // Add Twitter content
        if (summaries.twitter && summaries.twitter.content) {
            prompt += "## TWITTER CONTENT\n" + summaries.twitter.content + "\n\n";
        }
        
        prompt += "Remember to follow all the formatting instructions provided at the beginning. Create a well-structured report with clear headings, highlight cross-source trends, and make all links clickable.";

        // Generate content with Gemini
        const result = await model.generateContent(prompt);
        const response = result.response;
        
        return response.text();
    } catch (error) {
        console.error('Error generating AI overview:', error);
        throw new Error(`Failed to generate AI overview: ${error.message}`);
    }
}

module.exports = {
    generateOverview
};
