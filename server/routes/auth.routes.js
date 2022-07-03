const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const router = new Router();


router.post("/sign-up",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})

    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Incorrect request", errors});
            }

            const {email, password} = request.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return response.status(400).json({message: `User with email ${email} already exist`});
            }
            const hashPassword = await bcrypt.hash(password, 5);
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
            const {email, password} = request.body;

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


module.exports = router;
