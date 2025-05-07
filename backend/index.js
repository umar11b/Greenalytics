const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const app = express();
const PORT = 5000;

app.use(cors());

const mockData = require("./data/mockMetrics.json");

// Initialize Redis client
const redis = new Redis({
  host: "redis",
  port: 6379,
});

// Middleware to check Redis cache
const checkCache = async (req, res, next) => {
  try {
    const cachedData = await redis.get("metrics");
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Redis error:", error);
    next();
  }
};

app.get("/api/metrics", checkCache, async (req, res) => {
  try {
    // Cache the data in Redis with 1 hour expiration
    await redis.setex("metrics", 3600, JSON.stringify(mockData));
    res.json(mockData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
