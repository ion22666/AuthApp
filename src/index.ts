import * as argon2 from "argon2";
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

    // Set EJS as the view engine
    app.set("view engine", "ejs");
    app.set("views", "src/views");

    app.use("", consoleLogging);
    app.use("", express.json());
    app.use("", express.urlencoded({ extended: true }));

    app.use("/", express.static("dist/assets"));

    // login not required
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);

    app.use("", CookieParser());
    // redirect to login if missing the cookie
    app.use("", loginMiddleware);

    // login required
    app.get("/", homeRouter);

    app.listen(3000, () => {
        console.log(`Server is running on http://127.0.0.1:3000`);
    });
})();
