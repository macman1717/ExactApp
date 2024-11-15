require('dotenv').config();

const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI;
const { sendEmail } = require('../services/emailService');

router.get('/', async (req, res) => {
    console.log(`routes/scholarsRoutes.js | GET scholars request received`);
    console.log(DB_URL);
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
        console.log(`routes/scholarsRoutes.js | GET scholars request resolved`);
    }
})

async function queryForAllApplicants(client){
    return client.db("EXACT_dev_db").collection("admitted").find().toArray();
}

router.get('/:objectID', async (req, res) => {
    console.log(`routes/scholarsRoutes.js | GET scholars/${req.params.objectID} request received`);
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
        console.log(`routes/scholarsRoutes.js | GET scholars/${req.params.objectID} request resolved`);
    }
})

async function queryForApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params.objectID}`)}
    return client.db("EXACT_dev_db").collection("admitted").findOne(query);
}

async function sendAcceptedApplicationEmail(client, recipientEmail) {
    const subject = "Congratulations! Your Scholars Program Application has been Accepted";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Congratulations on Your Acceptance to the Exact Scholars Program!</h2>
            <p>Dear Applicant,</p>
            <p>We are thrilled to inform you that your application to the Exact Scholars Program has been accepted. Welcome aboard!</p>
            <p>We look forward to seeing your contributions and growth as part of this esteemed program. Please keep an eye on your inbox for further instructions and important information regarding your next steps.</p>
            <p>Best regards,</p>
            <p><strong>The Exact Scholars Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <footer style="font-size: 12px; color: #999;">
                <p>If you have any questions, please contact us at kperellg@ggc.edu</p>
                <p>&copy; 2024 Exact Scholars Program. All rights reserved.</p>
            </footer>
        </div>
    `;

    try {
        const emailResponse = await sendEmail(recipientEmail, subject, html);
        return { message: emailResponse.message };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

async function sendRejectedApplicationEmail(client, recipientEmail) {
    const subject = "Your Scholars Program Application Update";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Application Update: Exact Scholars Program</h2>
            <p>Dear Applicant,</p>
            <p>Thank you for your interest in the Exact Scholars Program. After careful consideration, we regret to inform you that your application has not been accepted at this time.</p>
            <p>We encourage you to continue pursuing your goals and consider reapplying in the future. Please feel free to reach out if you have any questions or would like feedback on your application.</p>
            <p>Warm regards,</p>
            <p><strong>The Exact Scholars Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <footer style="font-size: 12px; color: #999;">
                <p>If you have any questions, please contact us at kperellg@ggc.edu</p>
                <p>&copy; 2024 Exact Scholars Program. All rights reserved.</p>
            </footer>
        </div>
    `;

    try {
        const emailResponse = await sendEmail(recipientEmail, subject, html);
        return { message: emailResponse.message };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

async function sendApplicationEmail(client, recipientEmail) {
    const subject = "Your Scholars Program Application has been Successfully Submitted";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Thank You for Applying to the Exact Scholars Program!</h2>
            <p>Dear Applicant,</p>
            <p>Thank you for submitting your application to the Exact Scholars Program. We appreciate your interest and look forward to reviewing your application.</p>
            <p>Our team will carefully evaluate all submissions, and we will reach out to you with an update soon.</p>
            <p>Best regards,</p>
            <p><strong>The Exact Scholars Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <footer style="font-size: 12px; color: #999;">
                <p>If you have any questions, please contact us at kperellg@ggc.edu</p>
                <p>&copy; 2024 Exact Scholars Program. All rights reserved.</p>
            </footer>
        </div>
    `;

    try {
        const emailResponse = await sendEmail(recipientEmail, subject, html);
        return { message: emailResponse.message };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

async function sendAdminApplicationEmail(client, recipientEmail, body) {
    const subject = "New Scholars Program Application Received";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #FF9800;">New Scholars Application Submitted</h2>
            <p>Hello Admin,</p>
            <p>A new application has been submitted to the Exact Scholars Program.</p>
            <p>Here are the details:</p>
            <ul>
                <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
                <li><strong>Applicant's Email:</strong> ${body.email}</li>
            </ul>
            <p>Please log in to the admin portal to review the application.</p>
            <p>Thank you!</p>
            <p><strong>The Exact Scholars Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <footer style="font-size: 12px; color: #999;">
                <p>&copy; 2024 Exact Scholars Program. All rights reserved.</p>
            </footer>
        </div>
    `;

    try {
        const emailResponse = await sendEmail(recipientEmail, subject, html);
        return { message: emailResponse.message };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

router.post('/:stuID', async (req, res) => {
    console.log(`routes/scholarsRoutes.js | POST scholars/${req.params.stuID} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await sendApplicationEmail(client, req.body.email);
        const adminUsers = await getAdminUsersArray(client);

        for (const user of adminUsers) {
            await sendAdminApplicationEmail(client, user.email, req.body);
        }

        const result = await insertScholarsApplicant(req, client);
        res.send(result);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/scholarsRoutes.js | POST scholars/${req.params.stuID} request resolved`);
    }
})

async function getAdminUsersArray(client) {
    return client.db("EXACT_dev_db").collection("users").find().toArray();
}

async function insertScholarsApplicant(req, client){
    var applicant = req.body;
    return client.db("EXACT_dev_db").collection("admitted").insertOne(applicant);
}

router.delete('/:_id', async (req, res) => {
    console.log(`routes/scholarsRoutes.js | DELETE scholars/${req.params._id} request received`);
    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        res.send(await deleteScholarsApplicant(req, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/scholarsRoutes.js | DELETE scholars/${req.params._id} request resolved`);
    }
})

async function deleteScholarsApplicant(req, client){
    var query = {_id: new ObjectId(`${req.params._id}`)};
    return client.db("EXACT_dev_db").collection("admitted").deleteOne(query);
}

router.post('/accepted-applicant/:objectID', async (req, res) => {
    const applicant = req.body;
    console.log(`routes/scholarsRoutes.js | POST scholars/accepted-applicant/${req.body._id} request received`);

    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await sendAcceptedApplicationEmail(client, req.body.email);

        // Make the appropriate DB calls
        res.send(await insertAcceptedApplicant(applicant, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/scholarsRoutes.js | POST scholars/accepted-applicant/${req.params._id} request resolved`);
    }
})


router.post('/rejected-applicant/:objectID', async (req, res) => {
    const applicant = req.body;
    console.log(`routes/scholarsRoutes.js | POST scholars/rejected-applicant/${req.body._id} request received`);

    const client = new MongoClient(DB_URL);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await sendRejectedApplicationEmail(client, req.body.email);

        // Make the appropriate DB calls
        res.send(await insertRejectedApplicant(applicant, client));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(`routes/scholarsRoutes.js | POST scholars/rejected-applicant/${req.params._id} request resolved`);
    }
})


async function insertRejectedApplicant(applicant, client){
    return client.db("EXACT_dev_db").collection("rejectedScholars").insertOne(applicant);
}

async function insertAcceptedApplicant(applicant, client){
    let monthAccepted = new Date().getMonth();
    let yearAccepted = new Date().getFullYear();
    let semesterAccepted;
    if(monthAccepted < 5){
        semesterAccepted = "Spring"
    }else if(monthAccepted < 7){
        semesterAccepted = "Summer"
    }else{
        semesterAccepted = "Fall"
    }

    applicant["semesterAccepted"] = `${semesterAccepted} ${yearAccepted}`;
    return client.db("EXACT_dev_db").collection("currentScholars").insertOne(applicant);
}

module.exports = router;