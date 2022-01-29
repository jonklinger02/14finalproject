const mongoose = require("mongoose");
const { date } = require("yup");
require("dotenv").config();

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    required: [true, "you need a title"],
  },
  content: {
    type: String,
    required: [true, "you need content"],
  },
  excerpt: {
    type: String,
    required: [true, "you need catchy phrase"],
    maxLength: 500,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 2;
      },
      message: "you must add at least 2 actors",
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "public"],
      default: "draft",
      index: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };
