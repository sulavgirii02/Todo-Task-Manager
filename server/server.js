// =============================================
// server.js - Main Entry Point for the Backend
// =============================================
// This file sets up our Express server, connects
// to MongoDB, and mounts our API routes.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Load environment variables from .env file
dotenv.config();

// Import our task routes
const taskRoutes = require("./routes/taskRoutes");

// Create Express app
const app = express();

// ---- MIDDLEWARE ----
// These run on every request before reaching our routes

// Enable CORS so our React frontend can talk to this server
app.use(cors());

// Parse incoming JSON data (e.g., when creating a task)
app.use(express.json());

// ---- DATABASE CONNECTION ----
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-task-manager";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch(async (error) => {
    console.log("⚠️ Local MongoDB connection failed:", error.message);
    console.log("🔄 Starting in-memory MongoDB fallback...");
    try {
      // Increase launchTimeout to 60 seconds (60000ms) to allow the binary to download and start
      const mongoServer = await MongoMemoryServer.create({
        instance: { launchTimeout: 60000 }
      });
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("✅ Connected to in-memory MongoDB successfully!");
    } catch (memError) {
      console.error("❌ Failed to start in-memory MongoDB:", memError.message);
    }
  });

// ---- ROUTES ----
// All task-related API endpoints start with /api/tasks
app.use("/api/tasks", taskRoutes);

// Simple test route to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AI Task Manager API!" });
});

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/tasks`);
});
