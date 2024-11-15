require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {MongoClient, ObjectId} = require('mongodb');
const DB_URL = process.env.MONGODB_URI
const { sendEmail } = require('../services/emailService');

async function getUser(req, client) {
    try {
        await client.connect();
        const db = client.db("EXACT_dev_db");
        const collection = db.collection("users"); 
        const user = await collection.findOne({ email: req.body.email });
        return user;
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        await client.close();
    }
}

async function storeOTP(email, otp, client) {
    try {
        await client.connect();
        const db = client.db("EXACT_dev_db");
        const collection = db.collection("users"); 
        const result = await collection.updateOne(
            { email: email },
            {
                $set: {
                    otp: otp,
                    otpTimestamp: new Date(),
                },
            }
        );

        return result.modifiedCount > 0;
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        await client.close();
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function verifyOTP(email, enteredOtp, client) {
    try {
        await client.connect();
        const db = client.db("EXACT_dev_db");
        const collection = db.collection("users");

        const user = await collection.findOne({ email: email });
        if (!user || user.otp !== enteredOtp) {
            return { success: false, message: "Invalid OTP" };
        }

        const now = new Date();
        const otpTimestamp = new Date(user.otpTimestamp);
        const expirationTime = 10 * 60 * 1000;

        if (now - otpTimestamp > expirationTime) {
            return { success: false, message: "OTP has expired" };
        }

        return { success: true, message: "OTP verified successfully" };
    } catch (e) {
        console.error("Error verifying OTP:", e);
        return { success: false, message: "An error occurred" };
    } finally {
        await client.close();
    }
}

async function sendOtpEmail(client, recipientEmail) {
    const otp = generateOTP();
    const subject = "Your OTP Code";
    const html = `<p>Your OTP code is <strong>${otp}</strong></p><p>This code is valid for 10 minutes.</p>`;

    try {
        const emailResponse = await sendEmail(recipientEmail, subject, html);
        const otpStored = await storeOTP(recipientEmail, otp, client);

        if (!otpStored) {
            throw new Error("Failed to store OTP in database");
        }

        return { otp, message: emailResponse.message };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

router.post('/', async (req, res) => {
    console.log(`routes/loginRoutes.js | POST login/${req.body} request received`);
    const client = new MongoClient(DB_URL);
    const { email, password } = req.body;

    const user = await getUser(req, client);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'JWT_SECRET_GOES_HERE', { expiresIn: '24h' });
    res.status(200).json({ token });
});

router.post('/request-otp', async (req, res) => {
    console.log(`routes/loginRoutes.js | POST login/request-otp request received`);
    const client = new MongoClient(DB_URL);
    const { email } = req.body;

    const user = await getUser(req, client);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    sendOtpEmail(client, email)
        .then(response => {
            res.json({ message: response.message });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
        });
})

router.post('/verify-otp', async (req, res) => {
    console.log(`routes/loginRoutes.js | POST login/verify-otp request received`);
    const client = new MongoClient(DB_URL);
    const { email, enteredOtp } = req.body;

    const result = await verifyOTP(email, enteredOtp, client);
    
    if (!result.success) {
        return res.status(401).json({ message: result.message });
    }

    res.json({ message: 'OTP verified successfully. You can now reset your password.' });
});

router.post('/reset-password', async (req, res) => {
    console.log(`routes/loginRoutes.js | POST login/reset-password request received`);
    const client = new MongoClient(DB_URL);
    const { email, newPassword, enteredOtp } = req.body;

    try {
        const verificationResult = await verifyOTP(email, enteredOtp, client);
        
        if (!verificationResult.success) {
            return res.status(401).json({ message: verificationResult.message });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const result = await client.connect();
        const db = result.db("EXACT_dev_db");
        const collection = db.collection("users"); 

        const updateResult = await collection.updateOne(
            { email: email },
            { 
                $set: { 
                    password: hashedPassword, 
                    otp: null,
                    otpTimestamp: null 
                } 
            }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to reset password. Please try again.' });
        }

        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    } finally {
        await client.close();
    }
});


module.exports = router;