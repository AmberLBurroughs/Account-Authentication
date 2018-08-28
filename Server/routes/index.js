const path   = require("path");
const router = require("express").Router();

const apiRoutes 	 = require("./api");
const passportRoutes = require("./passport/passport.js");

// API Routes
router.use("/api", apiRoutes);

// PSSPORT Routes
router.use("/", passportRoutes);

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
);

module.exports = router;
