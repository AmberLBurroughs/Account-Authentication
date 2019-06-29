const path   = require("path");
const router = require("express").Router();

const apiRoutes 	 = require("./api");
const AuthRoutes   = require("./auth/auth.js");

// API Routes
router.use("/api", apiRoutes);

// Auth Routes
router.use("/", AuthRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => res.sendFile(path.join(__dirname, "../../client/build/index.html")));

module.exports = router;