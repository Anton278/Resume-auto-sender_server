import { Router } from "express";

import unreachableVacanciesController from "../controllers/unreachableVacancies.js";

const unreachableVacanciesRouter = Router();

unreachableVacanciesRouter.get("/", unreachableVacanciesController.getAll);
// unreachableVacations.post("/", unreachableVacationsController.create);
// unreachableVacations.patch("/", unreachableVacationsController.partlyUpdate);

export default unreachableVacanciesRouter;
