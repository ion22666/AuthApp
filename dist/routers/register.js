import express from "express";
import * as argon2 from "argon2";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";
export default express
    .Router()
    .get("/", (req, res) => {
    res.render("register");
})
    .post("/", async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirm_password)
            throw new Error("some parameters are missing");
        if (await User.findOne({ email: req.body.email }))
            throw new Error("email already in use");
        let user = await User.create({ email: req.body.email, password: await argon2.hash(req.body.password), username: req.body.username });
        res.cookie("session_id", (await Session.create({ userId: user._id }))._id, { maxAge: 3600000 });
        return res.redirect("/");
    }
    catch (e) {
        return res.render("register", { messages: [e] });
    }
})
    .post("/google", async (req, res) => {
    try {
    }
    catch (e) { }
});
