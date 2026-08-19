import * as moviesService from "../services/movies.service.js";

export const ListMovies = (req, res, next) => {
  try {
    const movies = moviesService.getAllMovies();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const movieDetail = (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = moviesService.getMovie(movieId);

    if (!movie) {
      return res.status(404).json({
        error: "Not Found",
        message: "The movie does not exist",
      });
    }

    res.status(200).json({ data: movie });
  } catch (err) {
    next(err);
  }
};

export const postMovie = (req, res, next) => {
  try {
    const movie = moviesService.createMovie(req.body);
    res.status(201).json({ message: "Succesfully created", ...movie });
  } catch (err) {
    next(err);
  }
};

export const updateMovie = (req, res, next) => {
  try {
    const updatedMovie = moviesService.updateMovie(req.params.id, req.body);

    if (!updatedMovie) {
      return res.status(404).json({
        error: "Not Found",
        message: "The movie does not exist",
      });
    }

    res.status(200).json({ message: "Successfully updated", ...updatedMovie });
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = (req, res, next) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = moviesService.deleteMovie(movieId);

    if (!deletedMovie) {
      return res.status(404).json({
        error: "Not Found",
        message: "The movie does not exist",
      });
    }

    res.status(204).json({ message: "Successfully deleted"});
  } catch (err) {
    next(err);
  }
};
