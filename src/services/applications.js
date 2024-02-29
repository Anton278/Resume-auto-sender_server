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
}

const applicationsService = new ApplicationsService();

export default applicationsService;
