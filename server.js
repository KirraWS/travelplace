require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Initialize express and server
const app = express();

// Use environment variables from .env file
const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not defined

// Use DATABASE_URL for PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Middleware to serve static files from the current directory
app.use(express.static(__dirname));  // This will serve all files in the current directory, including script.js

app.use(express.json());

// Define path for the index file
const indexPath = path.join(__dirname, 'index.html');

// Check if index.html exists
if (!fs.existsSync(indexPath)) {
    console.error(`❌ ERROR: index.html not found at ${indexPath}`);
} else {
    console.log(`✅ index.html found at ${indexPath}`);
}

// Route to serve the index.html file
app.get('/', (req, res) => {
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Error: index.html not found!');
    }
});

// Route to get all stays
app.get('/stays', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM stays');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to add a new stay
app.post('/stays', async (req, res) => {
    const { name, location, description, date } = req.body;

    console.log("Received Data:", req.body);

    // If date is missing, set it to the current date
    const formattedDate = date || new Date().toISOString();

    if (!name || !location || !description || !formattedDate) {
        console.log("❌ Missing fields");
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO stays (name, location, description, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, location, description, formattedDate]
        );
        console.log("✅ Inserted Successfully:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database Insert Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
