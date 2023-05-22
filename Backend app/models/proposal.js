const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    placeOfEvent: {
      type: String,
      required: true,
    },
    proposalType: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    From: {
      type: String,
      required: true,
    },
    To: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default : []
    },
    foodPreferences: {
      type: String,
      required: true,
    },
    events: {
      type: String,
      required: true,
    },
    vendorId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "vendor",
      required : true
    }
  },
  { timestamp: true }
);

const Proposal = mongoose.model("proposals", proposalSchema);

module.exports = Proposal;