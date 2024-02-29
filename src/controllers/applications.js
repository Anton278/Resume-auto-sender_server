import applicationsService from "../services/applications.js";
import { applicationSchema } from "../utils/applicationSchema.js";

class ApplicationsController {
  async getAll(req, res) {
    try {
      const applications = await applicationsService.getAll();
      res.status(200).json(applications);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "" });
    }
  }

  async create(req, res) {
    try {
      req.body = await applicationSchema.validate(req.body, {
        stripUnknown: true,
      });
    } catch (err) {
      res.status(400).json({ message: "Incorrect data shape" });
      return;
    }

    try {
      const createdApplication = await applicationsService.create(req.body);
      res.status(200).json({ ...req.body, id: createdApplication.insertedId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "" });
    }
  }
}

const applicationsController = new ApplicationsController();

export default applicationsController;
