import express, { Express, Request, Response } from "express";
import cors from "cors";
import movies from "./api/movies.route";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "not found" });
});

export default app;
