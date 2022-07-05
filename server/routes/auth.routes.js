const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {check} = require("express-validator");
const AuthController = require("../controllers/AuthController");

const router = new Router();


router.post("/sign-up", [
        check("email", "Incorrect email").isEmail(),
        check("password", "Password must be longer than 5 and shorter than 16").isLength({min: 5, max: 16})
    ],
    AuthController.SignUp
);
router.post("/sign-in", AuthController.SignIn);
router.get("/auth", authMiddleware, AuthController.Auth);


module.exports = router;
