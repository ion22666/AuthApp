import express from "express";
import { STATIC_DIR } from "../config/constants.js";
export default express
    .Router()
    .get("/", (req, res) => {
    res.sendFile("html/login.html", { root: STATIC_DIR });
})
    .get("/google", (req, res) => {
    res.json({ message: "google login" });
})
    .get("/microsoft", (req, res) => {
    res.json({ message: "microsoft login" });
});
