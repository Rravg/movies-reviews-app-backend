import ReviewsDAO from "../dao/reviewsDAO";
import { Request, Response, NextFunction } from "express";
import User from "../interfaces/User";
import { DeleteResult, UpdateResult } from "mongodb";

export default class ReviewsController {
  static async apiPostReview(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId: string = req.body.movie_id;
      const review: string = req.body.review;
      const userInfo: User = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date: Date = new Date();

      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date
      );

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  }

  static async apiUpdateReview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reviewId: string = req.body.review_id;
      const review: string = req.body.review;

      const date: Date = new Date();

      const ReviewResponse: UpdateResult | { error: Error } =
        await ReviewsDAO.updateReview(reviewId, req.body.user_id, review, date);

      if ("error" in ReviewResponse) {
        let { error } = ReviewResponse;
        res.status(404).json({ error });
      }
      // let { error } = ReviewResponse;
      // if (error) {
      //   res.status(500).json({ error });
      // }

      if ("modifiedCount" in ReviewResponse) {
        if (ReviewResponse.modifiedCount === 0) {
          throw new Error(
            "Unable to update review. User may not be original poster"
          );
        }
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  }

  static async apiDeleteReview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reviewId: string = req.body.review_id;
      const userId: string = req.body.user_id;
      const ReviewResponse: DeleteResult | { error: Error } =
        await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  }
}
