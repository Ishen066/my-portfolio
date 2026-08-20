const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// Gmail connection
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Contact API
app.post("/api/contact", async (req, res) => {

    const { name, email, subject, message } = req.body;


    if (!name || !email || !subject || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });

    }


    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        });


        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });


    } catch (error) {

        console.error("Email error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });

    }

});


module.exports = app;