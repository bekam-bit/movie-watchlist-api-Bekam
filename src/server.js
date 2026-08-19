import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { requireApiKey } from "./middleware/requireApiKey.js";
import { notFound } from "./middleware/notFound.js";
import movieRoutes from "./routes/movie.routes.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Movie Watchlist API is running" });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Movie routes
app.use("/api/movies", movieRoutes);

app.use(requireApiKey);

// 404 handler 
app.use(notFound);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
