import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
  PORT: process.env.PORT || 6000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
};
