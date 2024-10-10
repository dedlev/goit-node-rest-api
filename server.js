import mongoose from "mongoose";

import app from "./app.js";

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
    .then(() => console.log("Database connection successful"))
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});
