import { User } from "../models/user.model.js";

export const getDashboardForBoth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (user.role === "author") {
      return res.json({
        role: "author",
        redirect: "/author/dashboard",
      });
    }

    if (user.role === "user") {
      return res.json({
        role: "user",
        redirect: "/user/dashboard",
      });
    }
  } catch (error) {
    return res.status(500)
    .json({ success: false, message: "Server Error" });
  }
};
