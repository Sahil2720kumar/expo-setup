import express, { json, urlencoded } from "express";
import cors from "cors"
import multer from "multer"
import * as fs from 'fs';
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
import userRoutes from "./routes/users/index.js";
import serverless from "serverless-http";

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static("public"))
 

// Create uploads directory if it doesn't exist
const dir = './public/uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

//Products api
app.use("/products", productsRoutes);
//Auth apis
app.use("/auth", authRoutes);
//orders apis
app.use("/orders", ordersRoutes);
//users apis
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! 766");
});

// You don't need to listen to the port when using serverless functions in production
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
