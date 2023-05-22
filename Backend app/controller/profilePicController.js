require("dotenv").config();
const User = require("../models/user");
const Vendor = require("../models/vendor");
const { GridFSBucket, MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.DB_URL);

const updateDpUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic: req.file.filename },
      { new: true }
    );
    const { name, email, contact, isUser, selected, _id, profilePic } = user;
    res.status(201).json({
      status: "Success",
      user: { name, email, contact, isUser, selected, _id, profilePic },
    });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

const deleteDpUser = async (req, res, next) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);
    const filesSchema = db.collection(
      process.env.DB_PROFILE_PIC_COLLECTION + ".files"
    );
    const chunksSchema = db.collection(
      process.env.DB_PROFILE_PIC_COLLECTION + ".chunks"
    );

    let user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ status: "Failed", message: "Invalid ID" });
    if (!user.profilePic) return next();
    //del chunk
    let file = await filesSchema.findOne({ filename: user.profilePic });
    await chunksSchema.deleteMany({ files_id: file._id });
    //del file
    await filesSchema.deleteOne({ _id: file._id });
    next();
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

const updateDpVendor = async (req, res) => {
  try {
    let user = await Vendor.findByIdAndUpdate(
      req.params.id,
      { profilePic: req.file.filename },
      { new: true }
    );
    const { name, email, contact, isVendor, _id, profilePic } = user;
    res.status(201).json({
      status: "Success",
      user: { name, email, contact, isVendor, _id, profilePic },
    });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

const deleteDpVendor = async (req, res, next) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);
    const filesSchema = db.collection(
      process.env.DB_PROFILE_PIC_COLLECTION + ".files"
    );
    const chunksSchema = db.collection(
      process.env.DB_PROFILE_PIC_COLLECTION + ".chunks"
    );

    let user = await Vendor.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ status: "Failed", message: "Invalid ID" });
    if (!user.profilePic) return next();
    //del chunk
    let file = await filesSchema.findOne({ filename: user.profilePic });
    await chunksSchema.deleteMany({ files_id: file._id });
    //del file
    await filesSchema.deleteOne({ _id: file._id });
    next();
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

const renderDp = async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);
    const bucket = new GridFSBucket(db, {
      bucketName: process.env.DB_PROFILE_PIC_COLLECTION,
    });

    const image = bucket.openDownloadStreamByName(req.params.name);
    image.on("data", (data) => res.status(200).write(data));
    image.on("error", (err) => res.status(400).send({ msg: err.message }));
    image.on("end", () => res.end());
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  updateDpUser,
  updateDpVendor,
  deleteDpUser,
  deleteDpVendor,
  renderDp,
};
