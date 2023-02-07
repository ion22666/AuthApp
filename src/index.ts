import * as argon2 from "argon2";
import express from "express";

import { makeConnections } from "./config/mongodb.js";
import { consoleLogging } from "./middlewares.js";
import loginRouter from "./routers/login.js";
import registerRouter from "./routers/register.js";

(async () => {
    // const hash = await argon2.hash("password", { hashLength: 200 });
    // let is_lvalid = await argon2.verify(hash, "password");
    // console.log(hash);
    // console.log(is_lvalid);

    await makeConnections();

    const app = express();
    app.use("", consoleLogging);
    app.use("", express.json());
    app.use("/", express.static("dist/assets"));

    app.get("/home", (req, res) => {
        res.send("Hello World!");
    });

    app.use("/login", loginRouter);
    app.use("/register", registerRouter);

    app.listen(3000, () => {
        console.log(`Server is running on http://127.0.0.1:3000`);
    });
})();
