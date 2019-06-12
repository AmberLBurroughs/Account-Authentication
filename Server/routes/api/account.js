const router = require("express").Router();
const accountController = require("../../controllers/account-controller");

// =====================================
//    /api/account   ===================
// =====================================
router.route("/")
  .get(accountController.find)
  .post(accountController.create)
  .put(accountController.update)
  .delete(accountController.delete);

module.exports = router;
