const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  CourseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  PayTotal: Number,
  PayStatus: {
    type: Number,
    default: 0,
  },
  PayVoucher: String,
  PayTeacher: Number,
  PayProfit: Number,
  orderId: String,
  createdBy: {
    UserId: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  editedBy: [{
    UserId: String,
    editedAt: Date,
  },],
});

const Pay = mongoose.model("Pay", paySchema, "Pay");

module.exports = Pay;