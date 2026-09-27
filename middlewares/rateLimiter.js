import rateLimit from "express-rate-limit";

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  standardHeaders: true,
  legacyHeaders: false,
});

export default authRateLimiter;
