import * as argon2 from "argon2";
import mongoose from "mongoose";

(async () => {
    // const hash = await argon2.hash("password", { hashLength: 200 });
    // let is_lvalid = await argon2.verify(hash, "password");
    // console.log(hash);
    // console.log(is_lvalid);

    mongoose.set("strictQuery", false);

    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);
    console.log(mongoose.connection.readyState);

    const UserSchema = new mongoose.Schema({
        username: { type: { name: String }, required: true, unique: true },
        password: { type: String, required: true },
    });

    const User = mongoose.model<typeof UserSchema>("User", UserSchema);

    new User({ username: "Giovanni" }).save();
})();
