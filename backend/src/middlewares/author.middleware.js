import { User } from "../models/user.model.js";

export const isAuthor = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "author") {
    return res.status(403).json({
      message: "Access denied, Author only ",
    });
  }

  next();
};
