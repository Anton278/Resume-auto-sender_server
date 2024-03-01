import { db } from "../../index.js";

class UnreachableVacanciesService {
  async getAll() {
    const collection = db.collection("unreachableVacancies");
    const unreachableVacancies = await collection.find({}).toArray();
    return unreachableVacancies;
  }

  async getOne(url) {
    const collection = db.collection("unreachableVacancies");
    const applications = await collection.find({ url }).toArray();
    return applications[0];
  }

  async create(vacancy) {
    const collection = db.collection("unreachableVacancies");
    const createdVacancy = await collection.insertOne({ ...vacancy });
    return createdVacancy;
  }
}

const unreachableVacanciesService = new UnreachableVacanciesService();

export default unreachableVacanciesService;
