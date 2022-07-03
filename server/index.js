const {MongoClient} = require("mongodb");
const express = require("express");
const config = require("config");

const app = express();
const PORT = config.get("serverPort");

const client = new MongoClient(`mongodb+srv://${config.get("dbUser")}:${config.get("dbUserPassword")}@cloudstoragecluster.t1un3dc.mongodb.net/?retryWrites=true&w=majority`);
const start = async () => {
    try {
        await client.connect();
        console.log(`Connected to ${config.get("dbName")} data base!`);

        app.listen(PORT, () => {
            console.log("Server started on port", PORT);
        })

    } catch (error) {
        console.log(error);
    }
}

start().then();
