import UnreachableVacancyDto from "../dtos/unreachableVacancy.js";
import unreachableVacanciesService from "../services/unreachableVacancies.js";
import { createUnreachableVacancySchema } from "../utils/unreachableVacanySchemas.js";

class UnreachableVacanciesController {
  async getAll(req, res) {
    try {
      const unreachableVacancies = await unreachableVacanciesService.getAll();
      const unreachableVacanciesDtos = unreachableVacancies.map(
        (unreachableVacancy) => new UnreachableVacancyDto(unreachableVacancy)
      );
      res.status(200).json(unreachableVacanciesDtos);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unexpected error" });
    }
  }

  async create(req, res) {
    try {
      req.body = await createUnreachableVacancySchema.validate(req.body, {
        stripUnknown: true,
      });
    } catch (err) {
      res.status(400).json({ message: "Incorrect data shape" });
      return;
    }

    try {
      const createdUnreachableVacancy =
        await unreachableVacanciesService.create(req.body);
      res
        .status(200)
        .json({ ...req.body, id: createdUnreachableVacancy.insertedId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unexpected error" });
    }
  }
}

const unreachableVacanciesController = new UnreachableVacanciesController();

export default unreachableVacanciesController;
