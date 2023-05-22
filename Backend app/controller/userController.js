require("dotenv").config();
const User = require("../models/user");
const Vendor = require("../models/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//TO REGISTER AS USER
const userRegister = async (req, res) => {
    try {
      const { password, email, secret } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecret = await bcrypt.hash(secret, 10);
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: "Failed",
          field: "email",
          message: "Email already exists!",
        });
      }
  
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        secret: hashedSecret,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json({ status: "Success", user: savedUser });
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const vendorRegister = async (req, res) => {
    try {
      let { password, email, secret } = req.body;
      let hashedPassword = await bcrypt.hash(password, 10);
      let hashedSecret = await bcrypt.hash(secret, 10);
  
      let existingVendor = await Vendor.findOne({ email });
      if (existingVendor) {
        return res.status(400).json({
          status: "Failed",
          field: "email",
          message: "Email already exists!",
        });
      }
  
      let newVendor = new Vendor({
        ...req.body,
        password: hashedPassword,
        secret: hashedSecret,
      });
  
      const savedVendor = await newVendor.save();
  
      res.status(201).json({ status: "Success", vendor: savedVendor });
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const userLogin = async (req, res) => {
    let { email, password, contact } = req.body;
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const { name, email, contact, isUser, selected, _id, profilePic } =
            user;
          let jwtToken = await jwt.sign(
            { name, email, contact, isUser, selected, _id },
            process.env.SECRET
          );
          res.status(200).json({
            status: "Success",
            token: "JWT " + jwtToken,
            user: { name, email, contact, isUser, selected, _id, profilePic },
          });
        } else {
          res.status(401).json({
            status: "Failed",
            field: "password",
            message: "Incorrect password!",
          });
        }
      } else {
        res.status(401).json({
          status: "Failed",
          field: "email",
          message: "User not found!",
        });
      }
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
//TO CHECK SECRET OF USER
const userSecretCheck = async (req, res) => {
    let { email, secret } = req.body;
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        if (await bcrypt.compare(secret, user.secret)) {
          res.status(200).json({ status: "Success" });
        } else {
          res.status(401).json({
            status: "Failed",
            field: "secret",
            message: "Secret does not match!",
          });
        }
      } else {
        res
          .status(401)
          .json({ status: "Failed", field: "email", message: "User not found!" });
      }
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const userresetPassword = async (req, res) => {
    let { password, email } = req.body;
    try {
      let user = await User.findOne({ email });
      let hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      res.status(201).json({ status: "Success" });
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const vendorLogin = async (req, res, next) => {
    let { email, password, contact } = req.body;
    try {
      let user = await Vendor.findOne({ email });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const { name, email, contact, isVendor, _id, profilePic } = user;
          let jwtToken = await jwt.sign(
            { name, email, contact, isVendor, _id },
            process.env.SECRET
          );
          res.status(200).json({
            status: "Success",
            token: "JWT " + jwtToken,
            user: { name, email, contact, isVendor, _id, profilePic },
          });
        } else {
          res.status(401).json({
            status: "Failed",
            field: "password",
            message: "Password does not match!",
          });
        }
      } else {
        res
          .status(401)
          .json({ status: "Failed", field: "email", message: "User not found!" });
      }
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const vendorSecretCheck = async (req, res) => {
    let { email, secret } = req.body;
    try {
      let user = await Vendor.findOne({ email });
  
      if (user) {
        if (await bcrypt.compare(secret, user.secret)) {
          res.status(200).json({ status: "Success" });
        } else {
          res.status(401).json({
            status: "Failed",
            field: "secret",
            message: "Secret does not match!",
          });
        }
      } else {
        res
          .status(401)
          .json({ status: "Failed", field: "email", message: "User not found!" });
      }
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const vendorresetpassword = async (req, res) => {
    let { password, email } = req.body;
    try {
      let user = await Vendor.findOne({ email });
      let hashedPassword = await bcrypt.hash(password, 10);
      await Vendor.findByIdAndUpdate(user._id, { password: hashedPassword });
      res.status(201).json({ status: "Success" });
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  
  const SingleVendor = async (req, res) => {
    try {
      let vendor = await Vendor.findById(req.params.id);
      res.status(200).json({ status: "Success", vendor });
    } catch (err) {
      res.status(400).json({ status: "Failed", message: err.message });
    }
  };
  

module.exports = { userLogin, userRegister, vendorLogin, vendorRegister,  SingleVendor, userSecretCheck, vendorSecretCheck, userresetPassword, vendorresetpassword };