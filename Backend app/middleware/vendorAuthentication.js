require("dotenv").config();
const jwt = require("jsonwebtoken");

const vendorAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      if (!payload.isVendor) {
        return res.status(401).json({ status: "Failed", message: "Unauthorized" });
      }
    } catch (err) {
      return res.status(401).json({ status: "Failed", message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });
  }
  next();
};

module.exports = vendorAuth;
