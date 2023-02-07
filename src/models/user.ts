import mongoose from "mongoose";
import { AuthAppDb } from "../config/mongodb.js";

type UserType = {
    email: string;
    username: string;
    password: string;
    oauth: {
        google: {
            email: string;
            profile: string;
        };
        microsoft: {
            email: string;
            profile: string;
        };
    };
};

const UserSchema = new mongoose.Schema<UserType>({
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

export const User = AuthAppDb.model<UserType>("User", UserSchema);
