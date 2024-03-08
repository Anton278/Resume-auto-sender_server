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

    const createdAt = new Date().toISOString();
    await collection.insertOne({
      ...vacancy,
      createdAt,
      updatedAt: createdAt,
    });

    const createdVacancy = await collection.findOne({
      url: vacancy.url,
    });
    return createdVacancy;
  }

  async deleteOne(url) {
    const collection = db.collection("unreachableVacancies");

    const deletedVacancy = await collection.findOneAndDelete({ url });
    return deletedVacancy;
  }
}

const unreachableVacanciesService = new UnreachableVacanciesService();

export default unreachableVacanciesService;
