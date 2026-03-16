import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { cloudeUploadImage } from "../services/cloudinary.service.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (
      [fullName, username, email, password].some(
        (field) => !field || field.trim() === "",
      )
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    let profileImageUrl;

    if (req.file) {
      const uploadProfileImage = await cloudeUploadImage(
        req.file.path,
        "profile",
      );
      profileImageUrl = uploadProfileImage.url;
    }

    const user = await User.create({
      fullName,
      email,
      username,
      password,
      profileImage: profileImageUrl,
    });

    const createUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      createUser,
      message: "User successfully created",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY_DATE,
      },
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const userLogin = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({ user: userLogin, message: "User Logged In" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loggedUser = async (req, res) => {
  try {
    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", option)
      .json({ message: "User Logout" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select(
      "name username profileImage email role fullName isAuthor",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
