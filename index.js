import "dotenv/config";
import express from "express";
import cors from "cors";

import "./src/db/conn.js";
import "./src/telegramBot/index.js";
import applicationsRouter from "./src/routers/applications.js";
import unreachableVacanciesRouter from "./src/routers/unreachableVacancies.js";
import healthController from "./src/controllers/health.js";

const app = express();

app.use(
  cors({
    origin: "https://djinni.co",
  })
);
app.use(express.json());

app.use("/applications", applicationsRouter);
app.use("/unreachableVacancies", unreachableVacanciesRouter);
app.get("/health", healthController.get);

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
} catch (err) {
  console.log(err);
}
