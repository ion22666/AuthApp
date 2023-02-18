import express from "express";
import * as argon2 from "argon2";
import axios, { AxiosResponse } from "axios";

import { User } from "../models/user.js";
import { Session } from "../models/session.js";
import getGoogleUserInfo from "../utils/getGoogleUserInfo.js";
import { SessionLifeTime } from "../config/constants.js";

// login handler
// -> get one of the user email
// -> verify if email exists and get the user (for traditional login also check the password)
// -> delete old sessions
// -> create new sesion
// -> inject session cookie
// -> redirect to home

export default express
    .Router()
    .get("/", (req, res) => {
        return res.render("login.ejs");
    })
    // traditional login
    .post("/", async (req, res) => {
        try {
            // check for params
            if (!req.body.email || !req.body.password) throw new Error("email or password missing");

            // check if user exists
            let user = await User.findOne({ email: req.body.email });
            if (!user) throw new Error("The email address has no user associated with it");

            // verify password
            if (!(await argon2.verify(user.password!, req.body.password))) throw new Error("password not correct");

            // for safety clear old sessions
            await user.clearSessions();

            // create and inject new session
            res.cookie("session_id", await user.createSession(), { maxAge: SessionLifeTime });

            // redirect to home page
            return res.redirect("/");
        } catch (e) {
            return res.render("login.ejs", { messages: [e] });
        }
    })
    // google oauth login
    // receive the code -> get google email -> verify if exists

    .get("/google", async (req, res) => {
        try {
            // check for params
            if (!req.query.code) throw new Error("Something bad happened with google auth");

            // fetch user info
            let user_info = await getGoogleUserInfo(req.query.code.toString());

            // check if user exists
            let user = await User.findOne({ "oauth.google.email": user_info.email });
            if (!user) throw new Error("The google account has no user associated with it");

            // for safety clear old sessions
            await user.clearSessions();

            // create and inject new session
            res.cookie("session_id", await user.createSession(), { maxAge: SessionLifeTime });

            // redirect to home page
            return res.redirect("/");
        } catch (e) {
            return res.render("login.ejs", { messages: [e] });
        }
    })
    .get("/microsoft", (req, res) => {
        res.json(JSON.stringify({ message: "microsoft login" }));
    });
