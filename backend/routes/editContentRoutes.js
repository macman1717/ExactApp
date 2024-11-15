require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;

router.post('/:webpage/:section', async (req, res) => {
    console.log(`routes/editContentRoutes.js | Webpage: ${req.params.webpage} Section: ${req.params.section} POST request received`);

    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await addHtmlIntoDatabase(client, req.body, req));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/editContentRoutes.js | Webpage: ${req.params.webpage} Section: ${req.params.section} POST request resolved`);
    }
})

async function addHtmlIntoDatabase(client,content,req){
    var sectionNum = +req.params.section;
    var response = client.db("EXACT_dev_db").collection("webPages")
        .findOneAndReplace({
            webpage:`${req.params.webpage}`,
            section: sectionNum
        },content);
    return response;
}

router.get('/getPageContent/:webpage/:section', async (req, res) => {
    const client = new MongoClient(DB_URL);
    console.log(`routes/editContentRoutes.js | Webpage: ${req.params.webpage} Section: ${req.params.section} GET request received`);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const response = await getPageContent(client, req.params.webpage, req.params.section).then(object => {return object;})
        res.json(response);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/editContentRoutes.js | Webpage: ${req.params.webpage}  Section: ${req.params.section} GET request resolved`);
    }
})

async function getPageContent(client, webpage, section){
    var sectionNum = parseInt(section);
    var response = client.db("EXACT_dev_db").collection("webPages")
        .findOne({
            webpage:`${webpage}`,
            section: sectionNum
        });
    return response;
}

module.exports = router;