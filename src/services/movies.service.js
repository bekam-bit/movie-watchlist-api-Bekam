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
    rating: movie.rating !== undefined ? movie.rating : null,
  };

  // Add to array
  movies.push(newMovie);

  // Return the created movie
  return { data: newMovie };
}

export function updateMovie(id, updates) {
  const movieId = Number(id);

  // Find the movie by ID
  const index = movies.findIndex((movie) => movie.id === movieId);

  // If movie not found, return null
  if (index === -1) {
    return null;
  }

  // Get existing movie
  const existingMovie = movies[index];

  // Merge updates with existing data (only update provided fields)
  const updatedMovie = {
    ...existingMovie, // Keep all existing fields
    ...updates, // Override with provided updates
  };

  // Update the array
  movies[index] = updatedMovie;

  return { data: updatedMovie };
}

export function deleteMovie(id) {
  const movieId = Number(id);

  const index = movies.findIndex((movie) => movie.id === movieId);

  if (index === -1) {
    return null;
  }
  const deletedMovies = movies[index];
  movies.splice(index, 1);

  return { data: deletedMovies };
}
