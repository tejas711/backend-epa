const bcrypt = require("bcrypt");
const joi = require("joi");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtAuthToken = require("../middleware/jwtAuthToken");
// const Proposal=require("../Model/proposal")

const updatelist = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findById(id);

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "User does not exist" });

    let updateuser = user;
    let result = "updated";
    if (user.selected.indexOf(req.body.selected._id) === -1) {
      updateuser = await User.findByIdAndUpdate(
        { _id: id },
        {
          $push: { selected: req.body.selected._id },
        },
        { new: true }
      );
    } else result = "notupdated";
    const { name, email, contact, isUser, selected, _id, profilePic } = updateuser;
    res
      .status(200)
      .json({ status: "completed", message: result, data: { name, email, contact, isUser, selected, _id, profilePic } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const dellist = async (req, res) => {
  let { id } = req.params;

  try {
    let user = await User.findById(id);

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "User does not exist" });

    let updateuser = user;
    if (user.selected.indexOf(req.body.selected) !== -1) {
      updateuser = await User.findByIdAndUpdate(
        { _id: id },
        {
          $pull: { selected: req.body.selected },
        },
        { new: true }
      );
    }
    const { name, email, contact, isUser, selected, _id, profilePic } = updateuser;
    res
      .status(200)
      .json({ status: "completed", message: "updated....", data: { name, email, contact, isUser, selected, _id, profilePic } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const singleuser = async (req, res) => {
  const { id } = req.params;

  try {
    const prop = await User.findById(id);

    res
      .status(200)
      .json({ status: "completed", message: "single user is..", data: prop });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = { updatelist, singleuser, dellist };
