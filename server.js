require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Database connection
const pool = new Pool({
    connectionString: 'postgresql://wahajfs:wahajfs@localhost:5432/traveldb'
});

// Middleware
app.use(express.json());

// Get absolute path of index.html
const indexPath = path.join(__dirname, 'index.html');

// Check if index.html exists
if (!fs.existsSync(indexPath)) {
    console.error(`❌ ERROR: index.html not found at ${indexPath}`);
} else {
    console.log(`✅ index.html found at ${indexPath}`);
}

// Serve index.html from the root folder
app.get('/', (req, res) => {
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Error: index.html not found!');
    }
});

// Fetch stays
app.get('/stays', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM stays');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// Add a stay
app.post('/stays', async (req, res) => {
    const { name, location, description, image, rating } = req.body;

    console.log("Received Data:", req.body); // Debugging line

    if (!name || !location || !description || !image || !rating) {
        console.log("❌ Missing fields");
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO stays (name, location, description, image, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, location, description, image, rating]
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
