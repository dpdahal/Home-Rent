import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();


class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    }

    sendMail = (from,to,subject, message) => {
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: `(${from}) says: ${message}`,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send('Error sending message. Please try again later.');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Message sent successfully!');
            }
        });
    }
}

export default Mail;