import { db } from "../../index.js";

class HealthController {
  async get(req, res) {
    const dbConStatus = await db.command({ connectionStatus: 1 });

    // todo: failure anomaly

    try {
      res.status(200).json({
        uptime: Math.floor(process.uptime()),
        dbConnected: dbConStatus.ok,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unexpected error" });
    }
  }
}

const healthController = new HealthController();
export default healthController;
