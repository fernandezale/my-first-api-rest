import mongoose from "mongoose";
import dns from "node:dns";

export const dbConnect = async () => {
    try {
        dns.setServers(["1.1.1.1", "8.8.8.8"]);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error de conexión", error);
        throw error;
    }
};