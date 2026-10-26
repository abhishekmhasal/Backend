const mongoose = require("mongoose");
const followSchema = new mongoose.Schema(
  {
    Follower: {
      type: mongoose.Schema.ObjectId,
      ref: " users",
      required: [true, " follower is required"],
    },
    Followee: {
      type: mongoose.Schema.ObjectId,
      ref: " users",
      required: [true, " Followee is required"],
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model(" follows", followSchema);
module.exports = followModel;
