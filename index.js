import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import "express-async-errors";
import connectDb from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

import userRoutes from "./route/userRoutes.js";
import authRoutes from "./route/authRoutes.js";
import jobRoutes from "./route/jobRoutes.js";
import applicationRoutes from "./route/applicationRoutes.js";

import errorMiddelware from "./middlewares/errroMiddleware.js";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
connectDb();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Development",
      },
    ],
  },
  apis: ["./route/*.js"],
};

const spec = swaggerDoc(options);
const app = express();

<<<<<<< HEAD
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
=======
// middlewares
app.use(mongoSanitize()); //to secure database
app.use(helmet()); //to secure header data
app.use(xss()); //to prevent from cross site scripting
app.use(express.json()); //to use json data in our application

app.use(morgan("dev")); //logs which api route has been called and other info
app.use("/uploads", express.static("uploads")); //to serve uploaded file
>>>>>>> c3c8ddfc02b10571f3240739db7f9599fb95ef6a

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec, { customCssUrl: CSS_URL }));

app.use(errorMiddelware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.DEV_MODE} mode`.bgWhite.blue);
});
