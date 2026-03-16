import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    postImage: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },

  { timestamps: true },
);

export const Post = mongoose.model("Post", PostSchema);
