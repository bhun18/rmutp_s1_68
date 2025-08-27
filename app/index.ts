import { Hono } from "hono";
import PrismaClient from "@prisma/client/extension";
//import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

const app = new Hono();

app.get("/", (c) => c.text("Hello World!"));

app.get("/about", (c) => {
    return c.json ({
        massage: "Thanusphol Kruthong"
    });
});
app.get("/profile", () => {
    const profile = prisma.profile.findMany();
    return profile;
});

export default app;