import UnreachableVacancyDto from "../dtos/unreachableVacancy.js";
import unreachableVacanciesService from "../services/unreachableVacancies.js";

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
}

const unreachableVacanciesController = new UnreachableVacanciesController();

export default unreachableVacanciesController;
