import mongoose from "mongoose";
import { AuthAppDb } from "../config/mongodb.js";
const SessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Int,
        default: Date.now,
    },
});
export const Session = AuthAppDb.model("User", SessionSchema);
