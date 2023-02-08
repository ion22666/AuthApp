import mongoose from "mongoose";
import { AuthAppDb } from "../config/mongodb.js";

const UserSchema = new mongoose.Schema<global.UserType>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    oauth: {
        type: {
            google: {
                email: { type: String, unique: true },
                profile: { type: String },
            },
            microsoft: {
                email: { type: String, unique: true },
                profile: { type: String },
            },
        },
    },
});

export const User = AuthAppDb.model<global.UserType>("User", UserSchema);
