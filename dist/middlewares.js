import chalk from "chalk";
import { Session } from "./models/session.js";
import { User } from "./models/user.js";
export const consoleLogging = (req, res, next) => {
    let start = performance.now();
    console.log(chalk.bold.bgHex("#262626")(chalk.blueBright("REQUEST  "), chalk.hex("#00ff00")(req.method.toUpperCase().padEnd(5, " ")), chalk.cyan(req.originalUrl.padEnd(48, " "))));
    res.on("finish", () => {
        console.log(chalk.bold.bgHex("#363636")(chalk.hex("#FFA500")("RESPONSE "), chalk.hex("#00ff00")(req.method.toUpperCase().padEnd(5, " ")), chalk.cyan(req.originalUrl.padEnd(36, " ")), chalk.hex(res.statusCode >= 400 ? "#ff0000" : res.statusCode >= 300 ? "#FFA500" : "#00ff00")(res.statusCode), chalk.hex("#000000")(Math.round(performance.now() - start)
            .toString()
            .padStart(5, " ") + "ms")));
    });
    next();
};
export const loginMiddleware = async (req, res, next) => {
    if (!req.cookies.session_id)
        return res.redirect("/login");
    let session = await Session.findById(req.cookies.session_id);
    if (!session || Date.now() - session.createdAt > 3600000)
        return res.redirect("/login");
    let user = await User.findById(session.userId);
    if (!user)
        return res.redirect("/login");
    req.user = user;
    return next();
    return res.json(await Session.findById(req.cookies.session_id));
};
