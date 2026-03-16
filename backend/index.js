import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import router from "./src/routes/user.routes.js";
import cors from "cors";
import connectedDB from "./src/db/mongodbURL.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api/v1/users", router);
const PORT = process.env.PORT || 8080;

connectedDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
