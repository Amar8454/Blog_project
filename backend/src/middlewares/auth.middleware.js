import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized accessToken" });
    }

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById(decode?.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
