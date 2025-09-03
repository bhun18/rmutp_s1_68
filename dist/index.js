"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
// import { PrismaClient } from "../generated/prisma/client";
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get("/", (c) => c.text("Hello, World!"));
app.get("/about", (c) => {
    return c.json({
        message: "Thanusphol Kruthong"
    });
});
app.get("/profile", async (c) => {
    // logic
    const profile = await prisma.profile.findMany();
    return c.json(profile);
});
app.post("/profile", async (c) => {
    const body = await c.req.json();
    console.log('input of profile ', body);
    console.log('body.password(original)', body.password);
    //encode password
    const passwordHash = await bcrypt.hash(body.password, 10);
    console.log('hash.password(after)', passwordHash);
    body.password = passwordHash;
    console.log('body.password(replace)', body);
    ``;
    //save to d
    //output response
    return c.json({
        message: "creat profile completed"
    });
});
exports.default = app;
