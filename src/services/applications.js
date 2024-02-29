import { db } from "../../index.js";

class ApplicationsService {
  async getAll() {
    const collection = db.collection("applications");
    const applications = await collection.find({}).toArray();
    return applications;
  }

  async create(application) {
    const collection = db.collection("applications");
    const createdApplication = await collection.insertOne({ ...application });
    return createdApplication;
  }

  async partlyUpdate(application) {
    const collection = db.collection("applications");
    const applicationFromDb = await collection.findOne({
      url: application.url,
    });

    const updatedApplication = await collection.findOneAndUpdate(
      {
        url: application.url,
      },
      { $set: { ...applicationFromDb, ...application } },
      { returnDocument: "after" }
    );
    return updatedApplication;
  }
}

const applicationsService = new ApplicationsService();

export default applicationsService;
