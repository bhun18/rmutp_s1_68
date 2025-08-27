import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/";
//import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

const app = new Hono();

app.get("/", (c) => c.text("Hello World!"));

app.get("/about", (c) => {
    return c.json ({
        massage: "Thanusphol Kruthong"
    });
});
app.get("/profile", async(c) => {
    const profile = await prisma.profile.findMany();
    return c.json(profile);
})

export default app;