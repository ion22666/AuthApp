import mongoose from "mongoose";
import { AuthAppDb } from "../config/mongodb.js";
import { Session } from "./session.js";

const UserSchema = new mongoose.Schema<global.User>({
    email: { type: String, unique: true, sparse: true },
    username: { type: String },
    password: { type: String },
    oauth: {
        google: {
            id: { type: String },
            email: { type: String, unique: true, sparse: true },
            verified_email: { type: String },
            name: { type: String },
            given_name: { type: String },
            family_name: { type: String },
            picture: { type: String },
            locale: { type: String },
        },
        microsoft: {},
    },
});

UserSchema.methods.clearSessions = async function (this: global.User): Promise<void> {
    await Session.remove({ userId: this._id });
};
UserSchema.methods.createSession = async function (this: global.User) {
    return (await Session.create({ userId: this._id }))._id.toString();
};
export const User = AuthAppDb.model<global.User>("User", UserSchema);
