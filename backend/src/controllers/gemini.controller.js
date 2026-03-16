import main from "../geminiAi.js";

export const generateBlogPost = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Create Prompt
    const prompt = `
    Write a professional blog post.

    Title: ${title}

    Requirements:
    - 500 words
    - Include Introduction
    - Include Conclusion
    - SEO friendly
    - Well structured paragraphs
    `;

    // Call Gemini
    const content = await main(prompt);

    const descriptionPrompt = `Generate a 160 character SEO meta description for this blog:${content}`;
    const description = await main(descriptionPrompt);

    return res.status(200).json({
      success: true,
      title,
      content,
      description,
    });


  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Failed to generate blog post",
      error: error.message,
    });
  }
};
