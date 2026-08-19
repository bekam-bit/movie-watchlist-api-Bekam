import { movies } from "../data/movies.js";

export function getAllMovies() {
  return { data: movies || [] };
}

export function getMovie(id) {
  const movieId = Number(id);
  return movies.find((movie) => movie.id === movieId) || null;
}

export function createMovie(movie) {
  // Get the last movie's ID and increment
  const lastId = movies.length > 0 ? movies[movies.length - 1].id : 0;
  const newId = lastId + 1;

  // Create new movie with defaults
  const newMovie = {
    id: newId,
    title: movie.title,
    genre: movie.genre,
    watched: movie.watched !== undefined ? movie.watched : false,
    rating: movie.rating !== undefined ? movie.rating : null
  };

  // Add to array
  movies.push(newMovie);

  // Return the created movie
  return { data: newMovie };
}



