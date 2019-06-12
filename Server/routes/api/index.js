const router = require("express").Router();

const UserRoutes 	= require("./user");
const AccountRoutes = require("./account");

router.use("/user", UserRoutes);

router.use("/account", AccountRoutes);

module.exports = router;