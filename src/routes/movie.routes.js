import { Router } from "express";
import * as moviesController from "../controllers/movies.controller.js";

const router = Router();

// GET /api/movies - Get all movies
router.get("/", moviesController.ListMovies);
router.get("/:id", moviesController.movieDetail)

export default router;
