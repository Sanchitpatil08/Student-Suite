const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://vaibhavirnawale:vaibhavi@cluster0.i7vdjuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// check database connection
connect.then((db) => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

// create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = mongoose.model("courses", LoginSchema);

module.exports = collection;
