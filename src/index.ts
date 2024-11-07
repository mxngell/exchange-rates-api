import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { currencyRouter } from "./currency/currency.controller";

dotenv.config({ path: "./config/.env" });

const app = express();

async function main() {
  app.use(helmet());

  const PORT = process.env.PORT || 3000;

  app.use("/api/currency", currencyRouter);
  app.use("*", (request: Request, response: Response) => {
    response.status(404).json({
      message: "Not found",
      status: "404"
    });
  });
  app.use((request: Request, response: Response) => {
    response.status(500).json({
      message: "Internal Server Error",
      status: "500"
    });
  });

  app.listen(PORT, () => {
    console.log(`Sever started: http://localhost:${PORT}`);
  });
}

main();
