import * as argon2 from "argon2";
import mongoose from "mongoose";
try {
    const hash = await argon2.hash("password", { hashLength: 200 });
    console.log(hash);

    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });
} catch (err) {
    console.log(err);
}
