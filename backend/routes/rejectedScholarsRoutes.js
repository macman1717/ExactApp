require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;
router.get('/', async (req, res) => {
    console.log(`routes/rejectedScholarsRoutes.js | GET rejectedScholars request received`);
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
        console.log(`routes/rejectedScholarsRoutes.js | GET rejectedScholars request resolved`);
    }
})

async function queryForAllApplicants(client){
    var response = client.db("EXACT_dev_db").collection("rejectedScholars").find().toArray();
    return response;
}

router.get('/:objectID', async (req, res) => {
    console.log(`routes/rejectedScholarsRoutes.js | GET rejectedScholars/${req.params.objectID} request received`);
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
        console.log(`routes/rejectedScholarsRoutes.js | GET rejectedScholars/${req.params.objectID} request resolved`);
    }
})

async function queryForApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params.objectID}`)}
    var response = client.db("EXACT_dev_db").collection("rejectedScholars").findOne(query);
    return response;
}


router.delete('/:_id', async (req, res) => {
    console.log(`routes/rejectedScholarsRoutes.js | DELETE rejectedScholars/${req.params._id} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await deleteRejectedApplication(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/rejectedScholarsRoutes.js | DELETE rejectedScholars/${req.params._id} request resolved`);
    }
})

async function deleteRejectedApplication(req, client){
    var query = {_id: `${req.params._id}`};
    return client.db("EXACT_dev_db").collection("rejectedScholars").deleteOne(query);
}


module.exports = router;