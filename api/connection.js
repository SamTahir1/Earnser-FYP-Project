let mongoose = require('mongoose');
require('dotenv').config();

let db = require("./app/models");
let url = "mongodb+srv://root:root@cluster0.kwvau.mongodb.net/Earnser?retryWrites=true&w=majority";
let Role = db.role;

// For Local Server
db.mongoose
    .connect(`mongodb://localhost:27017/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// For Cloud Database
// db.mongoose
//     .connect(db.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Connected to the database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to the database!", err);
//         process.exit();
//     });
