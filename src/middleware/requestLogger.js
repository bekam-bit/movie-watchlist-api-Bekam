export function requestLogger(req, res, next){
    console.log(`[LOG] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
}
