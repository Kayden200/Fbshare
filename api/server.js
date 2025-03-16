const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve frontend files

// API Route for Form Submission
app.post('/api/submit', async (req, res) => {
    try {
        const { appstate, c3c_fbstate, url, amount, interval } = req.body;

        // Validate input data
        if (!url || !amount || !interval) {
            return res.status(400).json({ status: 400, error: 'Missing required fields' });
        }

        if (!appstate && !c3c_fbstate) {
            return res.status(400).json({ status: 400, error: 'Missing authentication data' });
        }

        console.log('Received Submission:', { appstate, c3c_fbstate, url, amount, interval });

        // Simulate processing (Replace with actual Facebook automation logic)
        setTimeout(() => {
            res.json({ status: 200, message: 'Submitted successfully!' });
        }, 2000);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
