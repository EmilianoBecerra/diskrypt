import express, { urlencoded } from "express";
import db from "./config/db.js";
import { rateLimit } from "express-rate-limit";
import filesRouter from "./routes/files.js";
import cors from "cors";
import helmet from "helmet";
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56
})


app.use(cors({
  origin: process.env.URL || "http://127.0.0.1:5500"
}));
app.use(limiter);
app.use(helmet())
app.use(express.json({
  limit: "5mb"
}));
app.use(urlencoded({
  limit: '5mb', extended: true
}))

app.use(filesRouter);

app.listen(PORT, () => {
  console.log("Servidor ok!")
});
