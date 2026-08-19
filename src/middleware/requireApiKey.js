const API_KEY = 'movie-class-2026';

export function requireApiKey(req, res, next){
    const key = req.headers['x-api-key'];

    if (!key || key !== API_KEY) {
    return res.status(403).json({ error: { message: 'Forbidden: invalid or missing API key' } });
  }
 
  next();

}