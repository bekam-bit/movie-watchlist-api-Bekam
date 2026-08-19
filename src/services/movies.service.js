import { movies } from "../data/movies.js";

export function getAllMovies() {
  return { data: movies || [] };
}

export function getMovie(id) {
  const movieId = Number(id);
  return movies.find((movie) => movie.id === movieId) || null;
}

