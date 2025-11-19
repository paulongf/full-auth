import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);

// ----------------------
// SERVE FRONTEND EM PRODUÇÃO
// ----------------------
if (process.env.NODE_ENV === "production") {
  // Servir arquivos estáticos do build do Vite
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Catch-all (Express 5 compatível)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
// ----------------------

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});
