function logger(req, res, err, next) {
      console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
      next();
}

module.exports = logger;