const express = require('express');
const path = require('path');
const backend = require('./backend');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

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

// Fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
