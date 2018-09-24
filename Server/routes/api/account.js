const router = require("express").Router();
const accountController = require("../../controllers/account-controller");

// Matches with "/api/account"
router.route("/")
  .get(accountController.find)
  .post(accountController.create)
  .put(accountController.update);

module.exports = router;
