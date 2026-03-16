import Comment from "../models/comment.model.js";

export const comment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;
    const { comment } = req.body;

    const addComments = await Comment.create({
      comment: comment,
      post: postId,
      user: userId,
    });

    return res.status(200).json({ success: true, addComments });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export const getComment = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate("user");
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    return res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
