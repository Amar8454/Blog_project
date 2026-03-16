import { AuthorModel } from "../models/author.model.js";
import { Post } from "../models/post.model.js";
import { cloudeUploadImage } from "../services/cloudinary.service.js";

export const createAuthor = async (req, res) => {
  try {
    const user = req.user;   // full user object
    const userId = user._id;   //  correct ID
    const { name, bio } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !bio) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  already author check
    if (user.role === "author") {
      return res.status(400).json({
        success: false,
        message: "User is already an author",
      });
    }

    const existingAuthor = await AuthorModel.findOne({ user: userId });
    if (existingAuthor) {
      return res.status(409).json({
        success: false,
        message: "Author profile already exists",
      });
    }

    let authorProfileImage;

    if (req.file) {
      const uploadAuthorProfile = await cloudeUploadImage(
        req.file.path,
        "author",
      );
      authorProfileImage = uploadAuthorProfile.url;
    }

    const author = await AuthorModel.create({
      name,
      bio,
      authorProfile: authorProfileImage,
      user: userId,
    });

    // update user
    user.role = "author";
    await user.save();  

    return res.status(200).json({
      success: true,
      message: "Author created successfully",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Author creation failed",
    });
  }
};

export const getAllAuthor = async (req, res) => {
  try {
    const authors = await AuthorModel.find().select(
      "name bio authorProfile createAt",
    );

    return res.status(200).json({
      success: true,
      authors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch authors",
    });
  }
};

export const getSingleAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await AuthorModel.findById(id).select(
      "name bio authorProfile createAt",
    );

    if (!author) {
      return res
        .status(401)
        .json({ message: "Author not Found", success: false });
    }

    return res.status(200).json({
      success: true,
      author,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch authors" });
  }
};

export const getAuthorPost = async (req, res) => {
  try {
    const { authorId } = req.params;
    const post = await Post.find({ author: authorId })
      .select(
        "title content createdAt description postImage category createdAt",
      )
      .populate("author")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAuthorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const author = await AuthorModel.findOne({ user: userId })
      .select("name bio authorProfile")
      .populate("user");

    if (!author) {
      return res
        .status(404)
        .json({ message: "Authon not Found", success: false });
    }

    return res.status(200).json({ success: true, authorData: author });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

export const getLoginAuthorPost = async (req, res) => {
  try {
    // Step 1: Find Author using logged-in user id
    const author = await AuthorModel.findOne({ user: req.user._id });

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author profile not found",
      });
    }

    // Step 2: Find Posts using Author._id
    const authorPosts = await Post.find({ author: author._id }).populate(
      "author",
    );

    return res.status(200).json({
      success: true,
      authorPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

export const deletePostByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user._id;

    const deletedPost = await Post.findByIdAndDelete({
      _id: id,
      author: authorId,
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const dashboardAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findOne({ user: req.user._id });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const totalPosts = await Post.countDocuments({ author: author._id });

    const published = await Post.countDocuments({
      author: author._id,
      status: "published",
    });

    const totalViewsData = await Post.aggregate([
      { $match: { author: author._id } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalViews = totalViewsData[0]?.totalViews || 0;

    return res.json({
      totalPosts,
      published,
      totalViews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
