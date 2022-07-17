import { MongoClient } from "mongodb";
import "dotenv/config";

import app from "./server";
import MoviesDao from "./dao/moviesDAO";
import ReviewsDao from "./dao/reviewsDAO";

async function main() {
  const client: MongoClient = new MongoClient(process.env.MOVIEREVIEWS_BD_URI!);
  const port: number = parseInt(process.env.PORT!) || 8000;

  try {
    // Connect to the MongoDB Cluster
    await client.connect();
    await MoviesDao.injectDB(client);
    await ReviewsDao.injectDB(client);

    app.listen(port, () => {
      console.log("Server is running on port:" + port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main().catch(console.error);
