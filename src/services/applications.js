import { db } from "../../index.js";

class ApplicationsService {
  async getAll() {
    const collection = db.collection("applications");
    const applications = await collection.find({}).toArray();
    return applications;
  }

  async getOne(url) {
    const collection = db.collection("applications");
    const applications = await collection.find({ url }).toArray();
    return applications[0];
  }

  async create(application) {
    const collection = db.collection("applications");

    const createdAt = new Date().toISOString();
    await collection.insertOne({
      ...application,
      createdAt,
      updatedAt: createdAt,
    });

    const createdApplication = await collection.findOne({
      url: application.url,
    });
    return createdApplication;
  }

  async partlyUpdate(application) {
    const collection = db.collection("applications");
    const applicationFromDb = await collection.findOne({
      url: application.url,
    });
    const updatedAt = new Date().toISOString();

    const updatedApplication = await collection.findOneAndUpdate(
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
