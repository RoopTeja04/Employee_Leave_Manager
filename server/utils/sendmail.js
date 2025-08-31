const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"HR Department" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
    } catch (err) {
        console.error("❌ Email sending failed:", err);
    }
};

module.exports = sendMail;