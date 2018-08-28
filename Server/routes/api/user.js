const router = require("express").Router();
const userController = require("../../controllers/user-controller");

// Matches with "/api/user"
router.route("/all")
  .get(userController.findAll)

// Matches with "/api/user"
router.route("/")
  // .post(userController.create);
  .get(userController.findById)
  // .put(userController.update)
  // .delete(userController.remove);

module.exports = router;
