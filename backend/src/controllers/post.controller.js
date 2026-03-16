import { AuthorModel } from "../models/author.model.js";
import { Post } from "../models/post.model.js";
import { cloudeUploadImage } from "../services/cloudinary.service.js";

export const createPosts = async (req, res) => {
  try {
    const { title, content, description, category } = req.body;

    if (
      [title, content, description, category].some(
        (field) => !field || field.trim() === "",
      )
    ) {
      return res.status(400).json({ message: "All field required" });
    }

    // multiple local image
    const localFileImage = req.files?.map((file) => file.path);

    // upload all images
    const uploadImage = await Promise.all(
      localFileImage.map((img) => cloudeUploadImage(img, "posts/images")),
    );

    const imageUrls = uploadImage.map((img) => img.url);

    if (!uploadImage) {
      return res.json({ message: "Image not exits" });
    }

    const author = await AuthorModel.findOne({ user: req.user._id });
    if (!author) {
      return res.status(401).json({ message: "Author not found" });
    }

    const creatPost = await Post.create({
      title,
      content,
      description,
      category,
      author: author._id,
      postImage: imageUrls,
    });

    return res
      .status(200)
      .json({ creatPost, message: "Post successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, category } = req.body;

    // Find logged-in author
    const author = await AuthorModel.findOne({ user: req.user._id });
    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    // Find post by id
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Authorization check
    if (post.author.toString() !== author._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Dynamic update object
    const updateFields = {
      ...(title && { title }),
      ...(content && { content }),
      ...(description && { description }),
      ...(category && { category }),
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    if (!posts) {
      return res.status(404).json({ message: "Post not exists" });
    }

    return res.status(201).json({ posts, message: "All post" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Internal server Error", error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not exist", success: false });
    }

    const postDelete = await Post.findByIdAndDelete(id);
    return res.status(201).json({ postDelete, message: "Post deleted" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Internal server Error", error });
  }
};

export const userPost = async (req, res) => {
  try {
    const user_post = await Post.find({ author: req.user._id }).populate(
      "author",
    );
    return res.status(201).json({ user: user_post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
