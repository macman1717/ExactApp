require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;

router.get('/', async (req, res) => {
    console.log(`routes/acceptedStoriesRoutes.js | GET acceptedStories request received`);
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
        console.log(`routes/acceptedStoriesRoutes.js | GET accepteStories request resolved`);
    }
})

async function queryForAllApplicants(client){
    var response = client.db("EXACT_dev_db").collection("accepted-stories").find().toArray();
    return response;
}

router.get('/:objectID', async (req, res) => {
    console.log(`routes/acceptedStoriesRoutes.js | GET acceptedStories/${req.params.objectID} request received`);
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
        console.log(`routes/acceptedStoriesRoutes.js | GET acceptedStories/${req.params.objectID} request resolved`);
    }
})

async function queryForApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params.objectID}`)}
    var response = client.db("EXACT_dev_db").collection("accepted-stories").findOne(query);
    return response;
}



router.post('/', async (req, res) => {
    console.log(`routes/acceptedStoriesRoutes.js | POST acceptedStories/${req.params.stuID} request received`);
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
        console.log(`routes/acceptedStoriesRoutes.js | POST acceptedStories/${req.params.stuID} request resolved`);
    }
})

async function insertStory(req, client){
    var applicant = req.body;
    return client.db("EXACT_dev_db").collection("accepted-stories").insertOne(applicant);
}


router.delete('/:_id', async (req, res) => {
    console.log(`routes/acceptedStoriesRoutes.js | DELETE acceptedStories/${req.params._id} request received`);
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
        console.log(`routes/acceptedStoriesRoutes.js | DELETE acceptedStories/${req.params._id} request resolved`);
    }
})

async function deleteStory(req, client){
    var query = {_id: new ObjectId(`${req.params._id}`)};
    return client.db("EXACT_dev_db").collection("accepted-stories").deleteOne(query);
}



router.put('/:_id', async (req, res) => {
    console.log(`routes/acceptedStoriesRoutes.js | PUT acceptedStories/${req.params._id} request received`);
    const client = new MongoClient(DB_URL);
    const storyId = new ObjectId(`${req.params._id}`); 
    const { visible } = req.body; 

    try {
        await client.connect();
        const db = client.db('EXACT_dev_db'); 
        const collection = db.collection('accepted-stories');

        const result = await collection.updateOne(
            { _id: storyId },
            { $set: { visible: visible } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).send({ message: 'Visibility updated successfully.' });
        } else {
            res.status(404).send({ message: 'Story not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while updating the story.' });
    } finally {
        await client.close();
    }
});

module.exports = router;