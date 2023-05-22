const cloudinary = require("../utils/cloudinary");

function convertBase64(file) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
  });
}

const uploadImages = async (req, res, next) => {
  try {
    let { images } = req.body;
    if (!images) return next();
    let imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const base64Data = await convertBase64(images[i]);
      const img = await cloudinary.uploader.upload(base64Data, {
        folder: "Event-proposals",
      });
      imageUrls.push(img.secure_url);
    }
    req.imageUrls = imageUrls;
    return next();
  } catch (err) {
    return res.status(400).json({ status: "Failed", message: err.message });
  }
};

module.exports = { uploadImages };
