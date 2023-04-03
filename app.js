import express from "express";
import router from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
  path: "./data/config.env",
});

// using middleware for send the data from postman
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

// Using Routes
app.use("/api/v1/users", router);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});


//using error middleware
app.use(errorMiddleware);
