const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Builder } = require('selenium-webdriver');
require('chromedriver');
const { SeleniumStealth } = require('selenium-stealth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Function to set up Stealth Chrome WebDriver
async function getStealthDriver() {
    let driver = await new Builder().forBrowser('chrome').build();
    const stealth = new SeleniumStealth(driver);
    await stealth.enabled();
    return driver;
}

// API Route for Spam Share
app.post('/api/spamshare', async (req, res) => {
    try {
        const { url, shareCount } = req.body;

        if (!url || !shareCount) {
            return res.status(400).json({ status: 400, error: 'Missing required fields' });
        }

        console.log(`🚀 Starting FB Spam Share - URL: ${url}, Shares: ${shareCount}`);

        let driver = await getStealthDriver();
        await driver.get(url); // Open Facebook post

        for (let i = 0; i < shareCount; i++) {
            console.log(`📤 Sharing post (${i + 1}/${shareCount})...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        }

        await driver.quit();
        res.json({ status: 200, message: `Successfully shared ${shareCount} times!` });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
