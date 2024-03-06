import { telegramBot } from "../../index.js";
import ApplicationDto from "../dtos/application.js";
import applicationsService from "../services/applications.js";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "../utils/applicationSchemas.js";
import { createSuccessMessage } from "../utils/createTelegramMessage.js";

class ApplicationsController {
  async getAll(req, res) {
    try {
      const { url } = req.query;
      if (url) {
        const application = await applicationsService.getOne(url);
        application
          ? res.status(200).json(application)
          : res.status(404).json(null);
        return;
      }

      const applications = await applicationsService.getAll();
      res.status(200).json(applications);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "" });
    }
  }

  async create(req, res) {
    try {
      req.body = await createApplicationSchema.validate(req.body, {
        stripUnknown: true,
      });
    } catch (err) {
      res.status(400).json({ message: "Incorrect data shape" });
      return;
    }

    try {
      const candidate = await applicationsService.getOne(req.body.url);
      if (candidate) {
        res
          .status(409)
          .json({ message: "application with given url already exist" });
        return;
      }

      const createdApplication = await applicationsService.create(req.body);
      const createdApplicationDto = new ApplicationDto(createdApplication);
      res.status(200).json(createdApplicationDto);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "" });
    }
  }

  async partlyUpdate(req, res) {
    try {
      // Bug on next line:
      // all not-required fields remove
      req.body = await updateApplicationSchema.validate(req.body, {
        stripUnknown: true,
      });
    } catch (err) {
      res.status(400).json({ message: "Incorrect data shape" });
      return;
    }

    try {
      const updatedApplication = await applicationsService.partlyUpdate(
        req.body
      );
      res.status(200).json(new ApplicationDto(updatedApplication));

      if (req.body.status === "successfully sent") {
        await telegramBot.api.sendMessage(
          process.env.TELEGRAM_ID,
          createSuccessMessage(updatedApplication),
          {
            parse_mode: "MarkdownV2",
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "" });
    }
  }
}

const applicationsController = new ApplicationsController();

export default applicationsController;
