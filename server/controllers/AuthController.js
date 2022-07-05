const User = require("../models/User");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const fileService = require("../services/fileService");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const config = require("config");

class AuthController {
    async SignUp(request, response) {
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
            await fileService.createDir(new File({user: user._id, name: ""}));
            return response.json({message: "User was created"});

        } catch (e) {
            console.log(e);
            response.send({message: "Server error"});
        }
    }

    async SignIn(request, response) {
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


        } catch (error) {
            console.log(error);
            response.send({message: "Server error"});
        }

    }

    async Auth(request, response) {
        try {
            const user = await User.findOne({_id: request.user.id});
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
    }
}


module.exports = new AuthController();
