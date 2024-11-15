require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;

router.get('/', async (req, res) => {
    console.log(`routes/storiesRoutes.js | GET stories request received`);
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
        console.log(`routes/storiesRoutes.js | GET stories request resolved`);
    }
})

async function queryForAllApplicants(client){
    var response = client.db("EXACT_dev_db").collection("stories").find().toArray();
    return response;
}

router.get('/:objectID', async (req, res) => {
    console.log(`routes/storiesRoutes.js | GET stories/${req.params.objectID} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await queryForApplicant(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/storiesRoutes.js | GET stories/${req.params.objectID} request resolved`);
    }
})

async function queryForApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params.objectID}`)}
    var response = client.db("EXACT_dev_db").collection("stories").findOne(query);
    return response;
}



router.post('/:stuID', async (req, res) => {
    console.log(`routes/storiesRoutes.js | POST stories/${req.params.stuID} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await insertStory(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/storiesRoutes.js | POST stories/${req.params.stuID} request resolved`);
    }
})

async function insertStory(req, client){
    var applicant = req.body;
    return client.db("EXACT_dev_db").collection("stories").insertOne(applicant);
}


router.delete('/:_id', async (req, res) => {
    console.log(`routes/storiesRoutes.js | DELETE stories/${req.params._id} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await deleteStory(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/storiesRoutes.js | DELETE stories/${req.params._id} request resolved`);
    }
})

async function deleteStory(req, client){
    var query = {_id: new ObjectId(`${req.params._id}`)};
    return client.db("EXACT_dev_db").collection("stories").deleteOne(query);
}




module.exports = router;