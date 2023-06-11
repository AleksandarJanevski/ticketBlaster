const multer = require('multer');
const uuid = require('uuid');

const imageId = uuid.v4()

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `public/img/${req.body.destination}`);
    },
    filename: (req, file, callback) => {
        const type = file.mimetype.split('/')[1]
        callback(null, `${req.body.destination}-${imageId}.${type}`);
    }
});
const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Unsupported file type'), false)
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadPicture = upload.single('picture');