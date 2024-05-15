import dotenv from "dotenv";
import path from "path";
dotenv.config();
// dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
  PORT: process.env.PORT || 6000,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb+srv://hshhaiseanghor:Of53W1HlD2oeaiRT@crud-app.ayzw8lv.mongodb.net/crud_db",
  ACCESS_SECRET: process.env.ACCESS_SECRET || "access_secrete168",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh_secrete168",
  ACCESS_EXPIRED_IN : process.env.ACCESS_EXPIRED_IN || "12h",
  REFRESH_EXPIRED_IN : process.env.REFRESH_EXPIRED_IN || "7d",
};
