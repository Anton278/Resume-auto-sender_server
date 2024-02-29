import express from "express";
import { MongoClient } from "mongodb";

import applicationsRouter from "./src/routers/applications.js";

const app = express();

app.use(express.json());

app.use("/applications", applicationsRouter);

const PORT = 5000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

try {
  await client.connect();
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
} catch (err) {
  console.log(err);
}

const db = client.db("auto-resume-sender");
export { db };
