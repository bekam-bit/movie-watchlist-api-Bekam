export function notFound(req, res, next) {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot found ${req.method} ${req.originalUrl}`
  });
}
