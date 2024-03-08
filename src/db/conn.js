import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

try {
  await client.connect();
} catch (err) {
  console.log(err);
}

const db = client.db(
  process.env.NODE_ENV === "development"
    ? "auto-resume-sender-test"
    : "auto-resume-sender"
);
export { db };
