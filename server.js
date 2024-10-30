import mongoose from "mongoose";
import sgMail from '@sendgrid/mail';
import "dotenv/config";
import app from "./app.js";

const { DB_HOST, PORT, SENDGRID_MAIL_FROM, SENDGRID_API_KEY } = process.env;

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running. Use our API on port: ${PORT}`);
            console.log("Database connection successful")
        })
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
