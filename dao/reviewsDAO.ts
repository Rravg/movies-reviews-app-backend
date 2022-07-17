import User from "../interfaces/User";
import ReviewDoc from "../interfaces/ReviewDoc";
import {
  Collection,
  Db,
  DeleteResult,
  MongoClient,
  ObjectId,
  UpdateResult,
} from "mongodb";

let reviews: Collection;

export default class ReviewsDAO {
  static async injectDB(conn: MongoClient) {
    if (reviews) {
      return;
    }
    try {
      const database: Db = conn.db(process.env.MOVIEREVIEWS_NS);
      reviews = database.collection("reviews");
    } catch (e) {
      console.error("Unable to connect in Reviews Data-Access-Object: " + e);
    }
  }

  static async addReview(
    movieId: string,
    user: User,
    review: string,
    date: Date
  ) {
    try {
      const reviewDoc: ReviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: new ObjectId(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error("Unable to post review: " + e);
      return { error: e as Error };
    }
  }

  static async updateReview(
    reviewId: string,
    userId: string,
    review: string,
    date: Date
  ) {
    try {
      const updateResponse: UpdateResult = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error("Unable to update review: " + e);
      return { error: e as Error };
    }
  }

  static async deleteReview(reviewId: string, userId: string) {
    try {
      const deleteResponse: DeleteResult = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error("Unable to delete review: " + e);
      return { error: e as Error };
    }
  }
}
