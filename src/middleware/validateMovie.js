export function validateMovie(req, res, next) {
  const { title, genre, watched, rating } = req.body;
  const errors = [];

  // Validate title
  if (title === undefined || title === null) {
    errors.push("title is required");
  } else if (typeof title !== "string") {
    errors.push("title must be a string");
  } else if (title.trim().length === 0) {
    errors.push("title cannot be empty or contain only whitespace");
  }

  // Validate genre
  if (genre === undefined || genre === null) {
    errors.push("genre is required");
  } else if (typeof genre !== "string") {
    errors.push("genre must be a string");
  } else if (genre.trim().length === 0) {
    errors.push("genre cannot be empty or contain only whitespace");
  }

  // Validate watched (optional, but must be boolean if provided)
  if (watched !== undefined && typeof watched !== "boolean") {
    errors.push("watched must be a boolean");
  }

  // Validate rating (optional, but must be null or number 1-5 if provided)
  if (rating !== undefined && rating !== null) {
    if (typeof rating !== "number") {
      errors.push("rating must be a number or null");
    } else if (rating < 1 || rating > 5) {
      errors.push("rating must be between 1 and 5");
    }
  }

  // If there are validation errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Validation failed",
      details: errors,
    });
  }

  next();
}

// Validation middleware for updating a movie (PATCH)
export function validateMovieUpdate(req, res, next) {
  const { title, genre, watched, rating, id, ...extraFields } = req.body;
  const errors = [];

  // Check if client is trying to modify id
  if (id !== undefined) {
    errors.push("id cannot be modified");
  }

  // Check for unexpected fields
  const allowedFields = ["title", "genre", "watched", "rating"];
  const providedFields = Object.keys(req.body);
  const unexpectedFields = providedFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (unexpectedFields.length > 0) {
    errors.push(`unexpected fields: ${unexpectedFields.join(", ")}`);
  }

  // Validate title (optional for update, but must be valid if provided)
  if (title !== undefined) {
    if (typeof title !== "string") {
      errors.push("title must be a string");
    } else if (title.trim().length === 0) {
      errors.push("title cannot be empty or contain only whitespace");
    }
  }

  // Validate genre (optional for update, but must be valid if provided)
  if (genre !== undefined) {
    if (typeof genre !== "string") {
      errors.push("genre must be a string");
    } else if (genre.trim().length === 0) {
      errors.push("genre cannot be empty or contain only whitespace");
    }
  }

  // Validate watched (must be boolean if provided)
  if (watched !== undefined && typeof watched !== "boolean") {
    errors.push("watched must be a boolean");
  }

  // Validate rating (must be null or number 1-5 if provided)
  if (rating !== undefined && rating !== null) {
    if (typeof rating !== "number") {
      errors.push("rating must be a number or null");
    } else if (rating < 1 || rating > 5) {
      errors.push("rating must be between 1 and 5");
    }
  }

  // If there are validation errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Validation failed",
      details: errors,
    });
  }

  next();
}
