import multer from "multer";
const uploadFile = multer({ dest: "./temp" });

export default uploadFile;
