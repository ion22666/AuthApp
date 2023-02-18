import express from "express";
import CookieParser from "cookie-parser";
import { makeConnections } from "./config/mongodb.js";
import { consoleLogging, loginMiddleware } from "./middlewares.js";
import loginRouter from "./routers/login.js";
import registerRouter from "./routers/register.js";
import homeRouter from "./routers/home.js";
(async () => {
    makeConnections();
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "src/views");
    app.use("", consoleLogging);
    app.use("", express.json());
    app.use("", express.urlencoded({ extended: true }));
    app.use("/static", express.static("dist/assets"));
    app.use("/favicon.ico", (req, res) => res.status(200).sendFile(process.cwd().replace(/\\/g, "/") + "/dist/assets/favicon.ico"));
    // login not required
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);
    app.use("", CookieParser());
    app.get("/test1", async (req, res) => {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        });
        res.sendStatus(200);
    });
    app.get("/test2", async (req, res) => {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        });
        res.sendStatus(200);
    });
    // redirect to login if missing the cookie
    app.use("", loginMiddleware);
    // login required
    app.use("/", homeRouter);
    // app.use("/register", registerRouter);
    app.listen(3000, () => {
        console.log(`Server is running on http://127.0.0.1:3000`);
    });
})();
