const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());


const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err.stack));


const createTableIfNotExists = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS tickers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                last FLOAT,
                buy FLOAT,
                sell FLOAT,
                volume FLOAT,
                base_unit VARCHAR(50)
            );
        `);
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        client.release();
    }
};

createTableIfNotExists();




const fetchTop10Tickers = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');

        const tickers = response.data;

        if (!tickers) {
            throw new Error('Tickers data is missing or malformed.');
        }

        const top10Tickers = Object.keys(tickers)
            .slice(0, 10)
            .map(key => tickers[key]);

        return top10Tickers;
    } catch (error) {
        console.error('Error fetching data from WazirX:', error.message);
        throw error;
    }
};


const storeTickersInDatabase = async (tickers) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const ticker of tickers) {
            const { name, last, buy, sell, volume, base_unit } = ticker;

            await client.query(
                'INSERT INTO tickers(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)',
                [name, last, buy, sell, volume, base_unit]
            );
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error storing tickers in database:', error);
    } finally {
        client.release();
    }
};


app.get('/fetch-and-store-tickers', async (req, res) => {
    try {
        const tickers = await fetchTop10Tickers();
        await storeTickersInDatabase(tickers);
        res.status(200).send('Tickers fetched and stored successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Error occurred while fetching or storing tickers');
    }
});


app.get('/tickers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickers');
        console.log("Data fetched successfully")
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error occurred while fetching data from database');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
