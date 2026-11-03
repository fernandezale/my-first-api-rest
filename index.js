import 'dotenv/config';
import express from "express";
import cors from "cors";
import { dbConnect } from "./src/config/database.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(cors());
//Usamos rutas
app.use("/api/auth", authRoutes);
app.use(cookieParser());

await dbConnect();

app.listen(PORT, () => {
    console.log(`Server online en puerto ${PORT}`);
});