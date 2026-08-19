# Movie Watchlist API

A RESTful API for managing a personal movie watchlist built with Node.js and Express.

## Description

This API allows users to manage their movie collection with full CRUD operations. Users can create, read, update, and delete movies, as well as filter and search through their watchlist. The API includes authentication via API key and comprehensive validation middleware.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, and Delete movies
- 🔍 **Advanced Filtering** - Filter by watched status, genre, and search by title
- 🔒 **API Key Authentication** - Protect write operations with API key
- ✅ **Request Validation** - Comprehensive validation for create and update operations
- 📝 **Request Logging** - Log all incoming requests with timestamps
- 🎯 **RESTful Design** - Follow REST conventions and best practices
- 💾 **In-Memory Storage** - Fast data access using JavaScript arrays

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Module System:** ES Modules

## API Endpoints

### Public Endpoints (No API Key Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/health` | Health check |
| GET | `/api/movies` | Get all movies (supports filtering) |
| GET | `/api/movies/:id` | Get a single movie by ID |

### Protected Endpoints (Require API Key)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/movies` | Create a new movie |
| PATCH | `/api/movies/:id` | Update an existing movie |
| DELETE | `/api/movies/:id` | Delete a movie |

## Query Parameters

### Filter Movies

| Parameter | Example | Description |
|-----------|---------|-------------|
| `watched` | `?watched=true` | Filter by watched status (true/false) |
| `genre` | `?genre=Sci-Fi` | Filter by genre (case-insensitive) |
| `search` | `?search=inter` | Search movies by title (case-insensitive) |

**Combine multiple filters:**
```
GET /api/movies?watched=true&genre=Sci-Fi
GET /api/movies?genre=Drama&search=shaw
```

## Middleware

### 1. **requestLogger**
- Logs all incoming requests with timestamp, method, and URL
- Example: `[LOG] 2026-08-19T10:30:45.123Z GET /api/movies`

### 2. **requireApiKey**
- Validates API key from `x-api-key` header
- Required for: POST, PATCH, DELETE operations
- Returns 403 if API key is missing or invalid

### 3. **validateMovie** (POST)
- Validates movie creation data
- Required fields: `title`, `genre`
- Optional fields: `watched` (boolean), `rating` (1-5 or null)
- Returns 400 with validation errors if invalid

### 4. **validateMovieUpdate** (PATCH)
- Validates movie update data
- All fields are optional
- Prevents `id` modification
- Rejects unexpected fields
- Returns 400 with validation errors if invalid

### 5. **notFound**
- Handles 404 errors for undefined routes
- Returns structured error response

## Folder Structure

```
movie-watchlist-api-Bekam/
├── src/
│   ├── controllers/
│   │   └── movies.controller.js    # Request handlers
│   ├── data/
│   │   └── movies.js                # In-memory data store
│   ├── middleware/
│   │   ├── notFound.js              # 404 handler
│   │   ├── requestLogger.js         # Request logging
│   │   ├── requireApiKey.js         # API key authentication
│   │   └── validateMovie.js         # Request validation
│   ├── routes/
│   │   └── movie.routes.js          # Route definitions
│   ├── services/
│   │   └── movies.service.js        # Business logic
│   └── server.js                    # Express app setup
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bekam-bit/movie-watchlist-api-Bekam.git
   cd movie-watchlist-api-Bekam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

4. **Server will run on:**
   ```
   http://localhost:3000
   ```

## Authentication

Protected endpoints require an API key header:

```
x-api-key: movie-class-2026
```

## Example Requests

### 1. Get All Movies
```http
GET http://localhost:3000/api/movies
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Interstellar",
      "genre": "Sci-Fi",
      "watched": true,
      "rating": 5
    },
    ...
  ]
}
```

### 2. Get Single Movie
```http
GET http://localhost:3000/api/movies/1
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "watched": true,
    "rating": 5
  }
}
```

### 3. Filter Watched Movies
```http
GET http://localhost:3000/api/movies?watched=true
```

### 4. Search by Title
```http
GET http://localhost:3000/api/movies?search=inter
```

### 5. Filter by Genre
```http
GET http://localhost:3000/api/movies?genre=Sci-Fi
```

### 6. Create New Movie
```http
POST http://localhost:3000/api/movies
Headers:
  Content-Type: application/json
  x-api-key: movie-class-2026

Body:
{
  "title": "Oppenheimer",
  "genre": "Biography",
  "watched": true,
  "rating": 5
}
```

**Response (201 Created):**
```json
{
  "message": "Successfully created",
  "data": {
    "id": 16,
    "title": "Oppenheimer",
    "genre": "Biography",
    "watched": true,
    "rating": 5
  }
}
```

### 7. Update Movie
```http
PATCH http://localhost:3000/api/movies/1
Headers:
  Content-Type: application/json
  x-api-key: movie-class-2026

Body:
{
  "rating": 4
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully updated",
  "data": {
    "id": 1,
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "watched": true,
    "rating": 4
  }
}
```

### 8. Delete Movie
```http
DELETE http://localhost:3000/api/movies/1
Headers:
  x-api-key: movie-class-2026
```

**Response (200 OK):**
```json
{
  "message": "Successfully deleted",
  "data": {
    "id": 1,
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "watched": true,
    "rating": 4
  }
}
```

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [
    "title is required",
    "rating must be between 1 and 5"
  ]
}
```

### 403 Forbidden (Invalid API Key)
```json
{
  "error": {
    "message": "Forbidden: invalid or missing API key"
  }
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The movie does not exist"
}
```

## Movie Data Model

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| id | Number | Auto-generated | Unique identifier |
| title | String | Yes | Non-empty, no whitespace only |
| genre | String | Yes | Non-empty, no whitespace only |
| watched | Boolean | No | Defaults to `false` |
| rating | Number or null | No | 1-5 or null, defaults to `null` |

## Testing

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create a new request
3. Set method, URL, headers, and body
4. Send request

### Using cURL

**Get all movies:**
```bash
curl http://localhost:3000/api/movies
```

**Create movie:**
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -H "x-api-key: movie-class-2026" \
  -d '{"title":"Oppenheimer","genre":"Biography","watched":true,"rating":5}'
```

**Update movie:**
```bash
curl -X PATCH http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: movie-class-2026" \
  -d '{"rating":4}'
```

**Delete movie:**
```bash
curl -X DELETE http://localhost:3000/api/movies/1 \
  -H "x-api-key: movie-class-2026"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server in development mode with auto-reload |
| `npm start` | Start server in production mode |

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Rate limiting
- [ ] Pagination for large datasets
- [ ] Sorting options (by rating, title, date added)
- [ ] Movie poster/image support
- [ ] External API integration (TMDb, OMDb)
- [ ] Unit and integration tests

## Author

**Bekam**
- GitHub: [@bekam-bit](https://github.com/bekam-bit)

## License

ISC
