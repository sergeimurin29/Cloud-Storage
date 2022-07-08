const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const FileController = require("../controllers/FileController");

const router = new Router();


router.post("", authMiddleware, FileController.createDir);
router.post("/upload", authMiddleware, FileController.uploadFile);

router.get("", authMiddleware, FileController.getFiles);
router.get("/download", authMiddleware, FileController.downloadFile);

router.delete("", authMiddleware, FileController.removeFile);






module.exports = router;
