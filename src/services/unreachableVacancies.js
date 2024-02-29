import { db } from "../../index.js";

class UnreachableVacanciesService {
  async getAll() {
    const collection = db.collection("unreachableVacancies");
    const unreachableVacancies = await collection.find({}).toArray();
    return unreachableVacancies;
  }
}

const unreachableVacanciesService = new UnreachableVacanciesService();

export default unreachableVacanciesService;
