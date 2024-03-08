import { db } from "../db/conn.js";

class ApplicationsService {
  #collection = db.collection("applications");

  async getAll() {
    const applications = await this.#collection.find({}).toArray();
    return applications;
  }

  async getOne(url) {
    const applications = await this.#collection.find({ url }).toArray();
    return applications[0];
  }

  async create(application) {
    const createdAt = new Date().toISOString();
    await this.#collection.insertOne({
      ...application,
      createdAt,
      updatedAt: createdAt,
    });

    const createdApplication = await this.#collection.findOne({
      url: application.url,
    });
    return createdApplication;
  }

  async partlyUpdate(application) {
    const applicationFromDb = await this.#collection.findOne({
      url: application.url,
    });
    const updatedAt = new Date().toISOString();

    const updatedApplication = await this.#collection.findOneAndUpdate(
      {
        url: application.url,
      },
      { $set: { ...applicationFromDb, ...application, updatedAt } },
      { returnDocument: "after" }
    );
    return updatedApplication;
  }
}

const applicationsService = new ApplicationsService();

export default applicationsService;
