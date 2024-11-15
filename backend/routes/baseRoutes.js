require('dotenv').config();

const express = require('express');
const {MongoClient} = require("mongodb");
const router = express.Router();
const DB_URL = process.env.MONGODB_URI;

router.get('/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
})

router.get('/', (req, res) => {
    res.send('Home page for rest API');
})

router.get('/getExactScholars', async (req, res) => {
    console.log(`baseRoutes.js | GET ExactScholars request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.json(await queryForAllApplicants(client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`baseRoutes.js | GET ExactScholars request resolved`);
    }
})

async function queryForAllApplicants(client){
    return client.db("EXACT_dev_db").collection("currentScholars").find().toArray();
}

module.exports = router;