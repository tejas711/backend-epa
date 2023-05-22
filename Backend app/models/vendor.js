const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        contact: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        secret: {
            type: String,
            required: true,
        },
        isVendor: {
            type: Boolean,
            required: true,
            default: true
        },
        profilePic: {
            type: String,
            default: null,
        }
    },
    { timestamp: true }
);
const Vendor = mongoose.model("vendors", vendorSchema);
module.exports = Vendor;