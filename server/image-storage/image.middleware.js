const multer = require('multer');

const { IMAGE_STORAGE_DIRECTORY } = require('../image-storage/image.constants');

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

  if (!allowedExtensions.includes(file.mimetype)) {
    cb(null, false);

    return cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
  }

  cb(null, true);
}

module.exports = multer({
  dest: IMAGE_STORAGE_DIRECTORY,
  fileFilter
});
