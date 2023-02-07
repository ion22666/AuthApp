import express from "express";
import { consoleLogging } from "./middlewares.js";
import loginRouter from "./routers/login.js";
(async () => {
    // const hash = await argon2.hash("password", { hashLength: 200 });
    // let is_lvalid = await argon2.verify(hash, "password");
    // console.log(hash);
    // console.log(is_lvalid);
    const app = express();
    app.use("", consoleLogging);
    app.use("/", express.static("dist/assets"));
    app.get("/home", (req, res) => {
        res.send("Hello World!");
    });
    app.use("/login", loginRouter);
    app.get("/callback", (req, res) => {
        res.json([req.params, req.query]);
    });
    app.get("/login", (req, res) => { });
    // const UserSchema = new mongoose.Schema({
    //     username: { type: String, required: true, unique: true },
    //     password: { type: String, required: true },
    // });
    // const User = mongoose.model("User", UserSchema);
    // // User.create<UserType>({ username: "Giovanni", password: "password" });
    // // new User<UserType>({ username: "Giovanni", password: "password" }).save();
    // let r = await User.findOne({ username: "Giovanni" });
    // User.create(r);
    app.listen(3000, () => {
        console.log(`Server is running on http://127.0.0.1:3000`);
    });
})();
