const User = require("../models/User");

class UserController {
    async getUserSpace(request, response) {
        try {
            const user = await User.findOne({user: request.user.id});
            return response.json({user: user._id, diskSpace: user.diskSpace, usedSpace: user.usedSpace});
        } catch (error) {
            console.log(error);
            return response.status(500).json({message: "User error"});
        }
    }
}

module.exports = new UserController();
