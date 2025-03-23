const express = require('express');
const path = require('path');
const backend = require('./backend');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Parse JSON request bodies
app.use(bodyParser.json());

// API endpoint to get the latest summaries
app.get('/api/summaries', (req, res) => {
    try {
        const summaries = backend.getLatestSummaries();
        res.json(summaries);
    } catch (error) {
        console.error('Error getting summaries:', error);
        res.status(500).json({ error: 'Failed to get summaries' });
    }
});

// API endpoint to get the latest AI overview
app.get('/api/overview', (req, res) => {
    try {
        const overview = backend.getLatestOverview();
        if (overview) {
            res.json(overview);
        } else {
            res.status(404).json({ error: 'No overview found' });
        }
    } catch (error) {
        console.error('Error getting overview:', error);
        res.status(500).json({ error: 'Failed to get overview' });
    }
});

// API endpoint to generate a new AI overview
app.post('/api/overview/generate', async (req, res) => {
    try {
        const overview = await backend.generateAIOverview();
        res.json(overview);
    } catch (error) {
        console.error('Error generating overview:', error);
        
        let errorMessage = 'Failed to generate overview';
        
        // Check if this is an API key issue
        if (error.message && error.message.includes('API key')) {
            errorMessage = 'API key configuration error. Please set up your Gemini API key in the config.js file or set the GEMINI_API_KEY environment variable.';
        }
        
        res.status(500).json({ error: errorMessage });
    }
});

// Fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
