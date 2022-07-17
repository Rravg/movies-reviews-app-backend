import express, { Router } from "express";
import MoviesController from "./movies.controller";
import ReviewsController from "./reviews.controller";

const router: Router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);

router.route("/id/:id").get(MoviesController.apiGetMovieById);

router.route("/ratings").get(MoviesController.apiGetRatings);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
