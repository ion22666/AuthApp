import express from "express";
import * as argon2 from "argon2";
import { STATIC_DIR } from "../config/constants.js";
import { User } from "../models/user.js";
export default express
    .Router()
    .get("/", (req, res) => {
    res.sendFile("html/register.html", { root: STATIC_DIR });
})
    .post("/", async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirm_password)
        return res.status(401).json({ message: "some parameters are missing" });
    if (await User.findOne({ email: req.body.email }))
        return res.status(401).json({ message: "email already in use" });
    return res.json(await User.create({ email: req.body.email, password: await argon2.hash(req.body.password), username: req.body.username }));
});
