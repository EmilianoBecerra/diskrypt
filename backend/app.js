import 'dotenv/config';
import express, { urlencoded } from "express";
import "./config/db.js";
import { rateLimit } from "express-rate-limit";
import filesRouter from "./routes/files.js";
import cors from "cors";
import helmet from "helmet";


const app = express();
const PORT = process.env.PORT || 3000;
const max = process.env.MAX_FILE_SIZE;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56
})


app.use(cors({
  origin: process.env.URL
}));
app.use(limiter);
app.use(helmet())
app.use(express.json({
  limit: max
}));
app.use(urlencoded({
  limit: max, extended: true
}))

app.use(filesRouter);

app.listen(PORT, () => {
  console.log("Servidor ok!")
});
