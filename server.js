import express from "express";
import dotenv, { config } from "dotenv";
import connectDB from "./utils/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import userRoute from "./routes/userRoute.js";
import gameRoute from "./routes/gameRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import adminRoute from "./routes/adminRoute.js";
import path from "path";
import { fileURLToPath } from "url";
config();
const app = express();
dotenv.config();
// import fileUpload from "express-fileupload";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "/", // Replace with your frontend URL
    // origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectDB();
// Configure CORS
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", userRoute);
app.use("/api", gameRoute);
app.use("/api", paymentRoute);
app.use("/api", adminRoute);

const allowedIps = [
  "154.80.91.199",
  "223.188.240.143",
  "152.59.90.120",
  "223.188.240.143",
  "152.58.88.115",
  "152.58.125.62",
  "106.219.167.32",
  "106.221.232.161",
];

const maintenanceMode = (req, res, next) => {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (allowedIps.includes(clientIp)) {
    // Allow access if IP is in the allowed list
    return next();
  }

  // Return a beautiful HTML page for maintenance mode
  res.status(503).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Maintenance Mode</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 3em;
                    margin-bottom: 0.5em;
                }
                p {
                    font-size: 1.2em;
                }
                .logo {
                    width: 100px;
                    height: auto;
                    margin-bottom: 1em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://img.lovepik.com/free-png/20211215/lovepik-child-asleep-waiting-for-a-gift-png-image_401649100_wh1200.png" alt="Logo" class="logo">
                <h1>We're currently undergoing maintenance</h1>
                <p>
                हमारी साइट अभी अपडेट की जा रही है. हम शीघ्र ही ऑनलाइन वापस आएँगे। आपके धैर्य के लिए धन्यवाद!
                !</p>
            </div>
        </body>
        </html>
    `);
};

// app.use(maintenanceMode);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = 5000 || process.PORT;

app.listen(port, () => {
  console.log(`server start ${port}`);
});
