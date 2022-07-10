const authMiddleware = require("../middleware/auth.middleware");
const UserController = require("../controllers/UserController")
const Router = require("express");

const router = new Router();

router.get("/space", authMiddleware, UserController.getUserSpace);

module.exports = router;
