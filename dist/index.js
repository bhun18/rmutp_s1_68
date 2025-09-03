"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
//import { PrismaClient } from "../generated/prisma/client";
//import PrismaClient from "@prisma/client";                                                                                         
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get("/", (c) => c.text("Hello World!"));
app.get("/about", (c) => {
    return c.json({
        mwssage: "Thanusphol Kruthong"
    });
});
app.get("/profile", async (c) => {
    //logic
    const profile = await prisma.profile.findMany();
    return c.json(profile);
});
app.post("/profile", async (c) => {
    //logic to create a new profile
    const body = await c.req.json();
    console.log('input of profile ', body);
    console.log('body.password(original) ', body.password);
    //encode password
    const passwordHash = await bcrypt.hash(body.password, 18);
    console.log('hash.password(after) ', passwordHash);
    body.password = passwordHash;
    console.log('body.password(replace) ', body);
    //save to db
    body.status = false;
    const result = await prisma.profile.create({
        data: body
    });
    //output response
    return c.json({
        message: "Create profile completed",
        data: result
    });
});
exports.default = app;
