import { Request, Response, NextFunction } from "express";
import { Document } from "mongodb";
import Filter from "../interfaces/Filter";
import MoviesDAO from "../dao/moviesDAO";

export default class MoviesController {
  static async apiGetMovies(req: Request, res: Response, next: NextFunction) {
    const moviesPerPage: number = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage as string)
      : 20;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;

    let filters: Filter = {};
    if (req.query.rated) {
      filters.rated = req.query.rated as string;
    } else if (req.query.title) {
      filters.title = req.query.title as string;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response: object = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response);
  }

  static async apiGetMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let id: string = req.params.id || "";
      let movie: Document | null | undefined = await MoviesDAO.getMovieById(id);
      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(movie);
    } catch (e) {
      console.error("Api, " + e);
      res.status(500).json({ error: e as Error });
    }
  }

  static async apiGetRatings(req: Request, res: Response, next: NextFunction) {
    try {
      let propertyTypes: string[] | undefined = await MoviesDAO.getRatings();
      res.json(propertyTypes);
    } catch (e) {
      console.error("Api, " + e);
      res.status(500).json({ error: e as Error });
    }
  }
}
