import { Router } from "express";

import unreachableVacanciesController from "../controllers/unreachableVacancies.js";

const unreachableVacanciesRouter = Router();

unreachableVacanciesRouter.get("/", unreachableVacanciesController.getAll);
unreachableVacanciesRouter.post("/", unreachableVacanciesController.create);
// unreachableVacanciesRouter.patch("/", unreachableVacanciesController.partlyUpdate);

export default unreachableVacanciesRouter;
