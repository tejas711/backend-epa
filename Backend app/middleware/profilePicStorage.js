require("dotenv").config();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const Storage = new GridFsStorage({
    url :process.env.DB_URL+process.env.DB_NAME,
    file : (req, file ) => {
        return {
            bucketName : process.env.DB_IMAGE_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    } 
})

const upload = multer({
    storage : Storage
});

module.exports = upload;