const nodemailer = require('nodemailer');
require('dotenv').config();

function sendEmail(recipientEmail, subject, html) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: subject,
            html: html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return reject({ message: 'An error has occurred' });
            }
            return resolve({ message: 'Email sent successfully' });
        });
    });
}



module.exports = { sendEmail };
