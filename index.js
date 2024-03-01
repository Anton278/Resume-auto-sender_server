import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import { Bot } from "grammy";

import applicationsRouter from "./src/routers/applications.js";
import unreachableVacanciesRouter from "./src/routers/unreachableVacancies.js";

const app = express();

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

app.use(
  cors({
    origin: "https://djinni.co",
  })
);
app.use(express.json());

app.use("/applications", applicationsRouter);
app.use("/unreachableVacancies", unreachableVacanciesRouter);

const PORT = 5000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

try {
  await client.connect();
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });

  telegramBot.on("message", async (ctx) => {
    const message = ctx.message; // the message object
    console.log(message);
  });

  await telegramBot.api.sendMessage(884805370, "Hi!");

  telegramBot.start();
} catch (err) {
  console.log(err);
}

const db = client.db("auto-resume-sender");
export { db };
