const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authMiddleware = require("../middleware/auth.middleware");
const {check, validationResult} = require("express-validator");
const router = new Router();


router.post("/sign-up",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Password must be longer than 3 and shorter than 16").isLength({min: 3, max: 16})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Incorrect request", errors});
            }

            const {email, password} = request.headers;

            const candidate = await User.findOne({email});

            if (candidate) {
                return response.status(400).json({message: `User with email ${email} already exist`});
            }
            const hashPassword = await bcrypt.hash(password, 3);
            const user = new User({email, password: hashPassword});

            await user.save();
            return response.json({message: "User was created"});

        } catch (e) {
            console.log(e);
            response.send({message: "Server error"});
        }
    });

router.post("/sign-in",
    async (request, response) => {
        try {
            const {email, password} = request.headers;
            const user = await User.findOne({email});
            if (!user) {
                return response.status(404).json({message: `User with email ${email} not found`});
            }

            const passwordIsValid = bcrypt.compareSync(password, user["password"]);
            if (!passwordIsValid) {
                return response.status(400).json({message: `Invalid password for ${email}`});
            }

            const token = jwt.sign({id: user["id"]}, config.get("secretKey"), {expiresIn: "1h"});

            return response.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
            })


        } catch (e) {
            console.log(e);
            response.send({message: "Server error"});
        }
    });


router.get("/auth", authMiddleware,
    async (request, response) => {
        try {
            const user = await User.findOne({_id:request.user.id});
            const token = jwt.sign({id: user["id"]}, config.get("secretKey"), {expiresIn: "1h"});

            return response.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
            })
        } catch (e) {
            console.log(e);
            response.send({message: "Server error"});
        }
    });


module.exports = router;
