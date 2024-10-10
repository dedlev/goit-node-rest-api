import mongoose from "mongoose";

import app from "./app.js";

//nssuvqcVTdhIAZxp

const DB_HOST = "mongodb+srv://Leonid:nssuvqcVTdhIAZxp@cluster0.7d04y.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB_HOST)
    .then(() => console.log("Database connection successful"))
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});
