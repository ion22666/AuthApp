import mongoose from "mongoose";
import { AuthAppDb } from "../config/mongodb.js";
const SessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
});
SessionSchema.methods.refreshLifetime = async function () {
    this.createdAt = Date.now();
    await this.save();
};
export const Session = AuthAppDb.model("Session", SessionSchema);
