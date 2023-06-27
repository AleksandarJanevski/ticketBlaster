const multer = require('multer');
const uuid = require('uuid');

const imageId = uuid.v4()

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `public/img/${req.params.destination}`);
    },
    filename: (req, file, callback) => {
        const type = file.mimetype.split('/')[1]
        callback(null, `${req.params.destination}-${Date.now()}-${imageId}.${type}`);
    }
});
const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Unsupported file type'), false)
    }
}

const maxSize = 10 * 1024 * 1024;
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: maxSize }
});
exports.uploadPicture = upload.single('picture');