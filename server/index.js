const express = require("express");
const config = require("config");
const MongoDBUser = require("./MongDBUserConfig.json");

const {MongoClient} = require("mongodb");
const client = new MongoClient(`mongodb+srv://sergeyDB:${MongoDBUser.dbUserPassword}@cloudstoragecluster.t1un3dc.mongodb.net/?retryWrites=true&w=majority`);

const start = async () => {
    try {
        await client.connect();
        console.log(`Connected to ${MongoDBUser.dbName} data base!`);
    } catch (e) {
        console.log(e);
    }
}

start().then();

/*pGmtIHytgN6bA7pE*/
