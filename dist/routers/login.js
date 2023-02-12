import express from "express";
import * as argon2 from "argon2";
import axios from "axios";
import { STATIC_DIR, GoogleCLient } from "../config/constants.js";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";
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
    try {
        let token_response = await axios.post("https://oauth2.googleapis.com/token", {
            code: req.query.code,
            client_id: GoogleCLient.client_id,
            client_secret: GoogleCLient.client_secret,
            redirect_uri: GoogleCLient.redirect_uri,
            grant_type: "authorization_code",
        });
        let user_info_response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token_response.data.access_token}`);
        let user_info = user_info_response.data;
        console.log(user_info.email);
        let user = await User.findOne({ "oauth.google.email": user_info.email });
        console.log(user);
        if (!user) {
            user = await User.create({ username: user_info.name, oauth: { google: user_info } });
        }
        // give the user his sesion cookie
        res.cookie("session_id", (await Session.create({ userId: user._id }))._id, { maxAge: 3600000 });
        return res.redirect("/");
    }
    catch (e) {
        console.log(e);
        return res.json(e);
        return res.redirect("/login");
    }
})
    .get("/microsoft", (req, res) => {
    res.json(JSON.stringify({ message: "microsoft login" }));
});
