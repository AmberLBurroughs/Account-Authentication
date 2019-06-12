const router = require("express").Router();
const userController = require("../../controllers/user-controller");

// =====================================
//     /api/user   =====================
// =====================================
router.route("/")
  .get(userController.find)
  .put(userController.update)
  .delete(userController.delete);
	
module.exports = router;