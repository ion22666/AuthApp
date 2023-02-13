import express from "express";
import * as argon2 from "argon2";
import axios, { AxiosResponse } from "axios";

import { post, STATIC_DIR, GoogleCLient } from "../config/constants.js";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

export default express
    .Router()
    .get("/", (req, res) => {
        return res.render("login");
    })
    .post("/", async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) throw new Error("email or password missing");
            let user = await User.findOne({ email: req.body.email });
            if (!user) throw new Error("no user exist with that email");
            if (!(await argon2.verify(user.password!, req.body.password))) throw new Error("password not correct");
            return res.redirect("/");
        } catch (e) {
            return res.render("login", { messages: [e] });
        }
    })
    .get("/google", async (req, res) => {
        try {
            let token_response: AxiosResponse<any, any> = await axios.post("https://oauth2.googleapis.com/token", {
                code: req.query.code,
                client_id: GoogleCLient.client_id,
                client_secret: GoogleCLient.client_secret,
                redirect_uri: GoogleCLient.redirect_uri,
                grant_type: "authorization_code",
            });

            let user_info_response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token_response.data.access_token}`);

            let user_info: {
                id: string;
                email: string;
                verified_email: string;
                name: string;
                given_name: string;
                family_name: string;
                picture: string;
                locale: string;
            } = user_info_response.data;
            let user = await User.findOne({ "oauth.google.email": user_info.email });
            if (!user) {
                user = await User.create({ username: user_info.name, oauth: { google: user_info } });
            }
            // give the user his sesion cookie
            res.cookie("session_id", (await Session.create({ userId: user._id }))._id, { maxAge: 3600000 });
            return res.redirect("/");
        } catch (e) {
            console.log(e);
            return res.json(e);
            return res.redirect("/login");
        }
    })
    .get("/microsoft", (req, res) => {
        res.json(JSON.stringify({ message: "microsoft login" }));
    });
