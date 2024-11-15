require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;


router.get('/', async (req, res) => {
    console.log(`routes/acceptedScholarsRoutes.js | GET acceptedScholars request received`);
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
        console.log(`routes/acceptedScholarsRoutes.js | GET acceptedScholars request resolved`);
    }
})

async function queryForAllApplicants(client){
    var response = client.db("EXACT_dev_db").collection("currentScholars").find().toArray();
    return response;
}

router.get('/:objectID', async (req, res) => {
    console.log(`routes/acceptedScholarsRoutes.js | GET acceptedScholars/${req.params.objectID} request received`);
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
        console.log(`routes/acceptedScholarsRoutes.js | GET acceptedScholars/${req.params.objectID} request resolved`);
    }
})

async function queryForApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params.objectID}`)}
    var response = client.db("EXACT_dev_db").collection("currentScholars").findOne(query);
    return response;
}


router.delete('/:_id', async (req, res) => {
    console.log(`routes/acceptedScholarsRoutes.js | DELETE acceptedScholars/${req.params._id} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await deleteAcceptedApplication(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/acceptedScholarsRoutes.js | DELETE acceptedScholars/${req.params._id} request resolved`);
    }
})

async function deleteAcceptedApplication(req, client){
    var query = {_id: `${req.params._id}`};
    return client.db("EXACT_dev_db").collection("currentScholars").deleteOne(query);
}


module.exports = router;