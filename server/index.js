const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")

const app = express();
const PORT = config.get("serverPort");

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
    try {
        const client = await mongoose.connect(`mongodb+srv://${config.get("dbUser")}:${config.get("dbUserPassword")}@cloudstoragecluster.t1un3dc.mongodb.net/?retryWrites=true&w=majority`);
        console.log(`Connected to ${config.get("dbName")} data base!`);

        app.listen(PORT, () => {
            console.log("Server started on port", PORT)
        })
    } catch (e) {

    }
}

start().then();
