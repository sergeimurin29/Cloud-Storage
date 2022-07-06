const fileService = require("../services/fileService");
const User = require("../models/User");
const File = require("../models/File");

class FileController {
    async createDir(request, response) {
        try {
            const {name, type, parent} = request.body;
            const file = new File({name, type, parent, user: request.user.id});
            const parentFile = await File.findOne({_id: parent});
            if (!parentFile) {
                file.path = name;
                await fileService.createDir(file);
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDir(file);
                parentFile.children.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return response.json(file);
        } catch (error) {
            console.log(error);
            return response.status(400).json(error);
        }
    }
    async getFiles(request, response) {
        try {
            const files = await File.find({user: request.user.id, parent: request.query.parent});
            return response.json(files);
        } catch (error) {
            console.log(error);
            return response.status(500).json({message: "Can not get files"});
        }
    }
}

module.exports = new FileController();
