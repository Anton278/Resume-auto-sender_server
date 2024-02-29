import { Router } from "express";

import applicationsController from "../controllers/applications.js";

const applicationsRouter = Router();

applicationsRouter.get("/", applicationsController.getAll);
applicationsRouter.post("/", applicationsController.create);

export default applicationsRouter;
