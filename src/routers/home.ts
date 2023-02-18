import express from "express";

import { Session } from "../models/session.js";

// home page handler

export default express
    .Router()
    .get("/", async (req, res) => {
        let user = req.user;
        function syntaxHighlight(json: string) {
            json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = "number";
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = "key";
                    } else {
                        cls = "string";
                    }
                } else if (/true|false/.test(match)) {
                    cls = "boolean";
                } else if (/null/.test(match)) {
                    cls = "null";
                }
                return '<span class="' + cls + '">' + match + "</span>";
            });
        }
        res.render("home", { user: user, json: syntaxHighlight(JSON.stringify(user)) });
    })
    .get("/logout", async (req, res) => {
        await req.user.clearSessions();
        return res.clearCookie("session_id").redirect("/");
    });
