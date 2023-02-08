import express from "express";
import * as argon2 from "argon2";
import axios from "axios";
import { STATIC_DIR, GoogleCLient } from "../config/constants.js";
import { User } from "../models/user.js";
export default express
    .Router()
    .get("/", (req, res) => {
    res.sendFile("html/login.html", { root: STATIC_DIR });
})
    .post("/", async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(401).json({ message: "email or password missing" });
    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: "no user exist with that email" });
    if (!(await argon2.verify(user.password, req.body.password)))
        return res.status(401).json({ message: "password not correct" });
    return res.json({ message: "succes" });
})
    .get("/google", async (req, res) => {
    if (!req.query.code)
        return res.redirect("/login");
    let token_response = await axios.post("https://oauth2.googleapis.com/token", {
        code: req.query.code,
        client_id: GoogleCLient.client_id,
        client_secret: GoogleCLient.client_secret,
        redirect_uri: GoogleCLient.redirect_uri,
        grant_type: "authorization_code",
    });
    if (token_response.status > 299 || token_response.status < 200)
        return res.redirect("/login");
    let user_info_response = await axios.get("https://www.googleapis.com/auth/userinfo.email?token=" + token_response.data.token);
})
    .get("/microsoft", (req, res) => {
    res.json(JSON.stringify({ message: "microsoft login" }));
});
