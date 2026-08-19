import { Router } from "express";
import * as moviesController from "../controllers/movies.controller.js";
import { validateMovie } from "../middleware/validateMovie.js";
import { requireApiKey } from "../middleware/requireApiKey.js";

const router = Router();

// Public GET routes (no API key needed)
router.get("/", moviesController.ListMovies);
router.get("/:id", moviesController.movieDetail);

// Protected POST route (requires API key + validation)
router.post("/", requireApiKey, validateMovie, moviesController.postMovie);

export default router;
