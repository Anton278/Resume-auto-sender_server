import { ObjectId } from "mongodb";

import { db } from "../db/conn.js";

class UnreachableVacanciesService {
  #collection = db.collection("unreachableVacancies");

  async getAll() {
    const unreachableVacancies = await this.#collection.find({}).toArray();
    return unreachableVacancies;
  }

  async getOne(url) {
    const applications = await this.#collection.find({ url }).toArray();
    return applications[0];
  }

  async create(vacancy) {
    const createdAt = new Date().toISOString();
    await this.#collection.insertOne({
      ...vacancy,
      createdAt,
      updatedAt: createdAt,
    });

    const createdVacancy = await this.#collection.findOne({
      url: vacancy.url,
    });
    return createdVacancy;
  }

  async deleteOne(id) {
    const deletedVacancy = await this.#collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return deletedVacancy;
  }
}

const unreachableVacanciesService = new UnreachableVacanciesService();

export default unreachableVacanciesService;
