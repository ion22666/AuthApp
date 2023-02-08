import express from "express";
export default express.Router().get("/", async (req, res) => {
    let user = req.user;
    res.send(`<p>Hello ${user.username} </p>`);
});
