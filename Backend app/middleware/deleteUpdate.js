require("dotenv").config();
const Proposal = require("../models/proposal");
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.DB_URL);

const deleteUpdate = async (req, res, next) => {
  try {
    if (!req.body.images || !req.files) return next();
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);
    const filesSchema = db.collection(
      process.env.DB_IMAGE_COLLECTION + ".files"
    );
    const chunksSchema = db.collection(
      process.env.DB_IMAGE_COLLECTION + ".chunks"
    );

    let post = await Proposal.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ status: "Failed", message: "Invalid ID" });

    for (let filename of post.images) {
      // del chunk
      let file = await filesSchema.findOne({ filename: filename });
      await chunksSchema.deleteMany({ files_id: file._id });
      // del file
      await filesSchema.deleteOne({ _id: file._id });
    }

    return next();
  } catch (err) {
    return res.status(400).json({ status: "Failed", message: err.message });
  }
};

module.exports = deleteUpdate;
