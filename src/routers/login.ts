import express from "express";
import * as argon2 from "argon2";

import { STATIC_DIR } from "../config/constants.js";
import { User } from "../models/user.js";

export default express
    .Router()
    .get("/", (req, res) => {
        res.sendFile("html/login.html", { root: STATIC_DIR });
    })
    .post("/", async (req, res) => {
        if (!req.body.email || !req.body.password) return res.status(401).json({ message: "email or password missing" });
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "no user exist with that email" });
        if (!(await argon2.verify(user.password, req.body.password))) return res.status(401).json({ message: "password not correct" });
        return res.json({ message: "succes" });
    })
    .get("/google", (req, res) => {
        res.json({ message: "google login" });
    })
    .get("/microsoft", (req, res) => {
        res.json({ message: "microsoft login" });
    });
