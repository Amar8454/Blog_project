import { Router } from "express";
import {
  registerUser,
  loginUser,
  loggedUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPosts,
  deletePost,
  getAllPost,
  getSinglePost,
  updatePost,
  userPost,
} from "../controllers/post.controller.js";
import { isAuthor } from "../middlewares/author.middleware.js";
import {
  createAuthor,
  dashboardAuthor,
  getAllAuthor,
  getAuthorPost,
  getAuthorProfile,
  getLoginAuthorPost,
  getSingleAuthor,
} from "../controllers/author.controller.js";
import { getDashboardForBoth } from "../controllers/dashboard.controller.js";
import { generateBlogPost } from "../controllers/gemini.controller.js";
import {
  comment,
  deleteComment,
  getComment,
} from "../controllers/comment.controller.js";

const router = Router();

// user routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyUser, loggedUser);
router.get("/get_user_profile", verifyUser, getUserProfile);

// author routes
router.patch("/author/:id", verifyUser, isAuthor);

// dashboard for both
router.get("/get_dashboard", verifyUser, getDashboardForBoth);

// post routes
router.post(
  "/create_post",
  verifyUser,
  upload.array("postImage", 4),
  createPosts,
);
router.put("/update_post/:id", verifyUser, isAuthor, updatePost);
router.get("/get_all_posts", getAllPost);
router.delete("/delete_post/:id", deletePost);
router.get("/get_user_posts", verifyUser, userPost);
router.get("/get_single_post/:id", verifyUser, getSinglePost);

// author routes
router.post(
  "/create_author",
  verifyUser,
  upload.single("authorProfile"),
  createAuthor,
);
router.get("/get_all_author", getAllAuthor);
router.get("/get_single_author/:id", getSingleAuthor);
router.get("/get_author_post/:authorId", verifyUser, getAuthorPost);
router.get("/get_author_profile/:id", verifyUser, getAuthorProfile);
router.get("/get_author_posts", verifyUser, getLoginAuthorPost);
router.put("/delete_post/:id", verifyUser, isAuthor, deletePost);
router.get("/get_author_dashboard_details", verifyUser, dashboardAuthor);
router.post("/generate_blog", verifyUser, generateBlogPost);

// comment
router.post("/post_comment/:id", verifyUser, comment);
router.get("/get_comments/:id", verifyUser, getComment);
router.delete("/delete_comment/:id", verifyUser, deleteComment);
export default router;
