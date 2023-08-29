import dotenv from "dotenv";
dotenv.config();

import AppFactory from "../Presentation/Factories/appFactory.js";
import DbFactory from "../Data/Dao/Factories/dbFactory.js";

const initServer = async() =>
{
  // const db = DbFactory.create(process.env.DB);
  // db.init(process.env.DB_URI);

  const app = AppFactory.create();

  app.init();
  app.build();
  app.start();

  return {
    app
  }
};

export default initServer;