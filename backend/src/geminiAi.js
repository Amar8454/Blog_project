import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI);

async function main(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // ✅ fixed
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

export default main;