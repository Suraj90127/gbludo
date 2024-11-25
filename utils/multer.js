// export default multerFile
import multer from "multer";
import fs from "fs"
import path from "path";

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "./uploads";
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, path.resolve(uploadPath));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
export const upload = multer({ storage: storage })