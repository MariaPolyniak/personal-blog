const fs = require("fs");
const path = require("path");

const { IMAGE_STORAGE_DIRECTORY } = require('../image-storage/image.constants');

exports.getImage = async(req, res) => {
  try {
    res.sendFile(path.resolve(IMAGE_STORAGE_DIRECTORY, req.params.imageId));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteImage = async(req, res) => {
  try {
    fs.unlink(path.resolve(IMAGE_STORAGE_DIRECTORY, req.params.imageId), (err) => {
      if(err) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(200).json({ success: true });
      }
    });
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}
