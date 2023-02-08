import express from "express";
import * as argon2 from "argon2";

import { STATIC_DIR } from "../config/constants.js";
import { User } from "../models/user.js";

export default express.Router().get("/", async (req, res) => {
    let user = req.user;
    res.send(`<p>Hello ${user.username} </p>`);
});
