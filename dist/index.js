"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const service_1 = require("./service");
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get("/", (c) => c.text("Hono!"));
app.get("/about", (c) => {
    return c.json({ message: "thanusphol kruthong" });
});
//GET profiles
app.get("/profile", async (c) => {
    const profiles = await prisma.profile.findMany();
    const decodedProfiles = profiles.map((p) => ({
        ...p,
        mobile: (0, service_1.decrypted)(p.mobile),
        cardId: (0, service_1.decrypted)(p.cardId),
    }));
    return c.json(decodedProfiles);
});
//CREATE profile
app.post("/profile", async (c) => {
    const body = await c.req.json();
    console.log("input of profile", body);
    console.log("body.password(original)", body.password);
    // encode sensitive fields
    const encMobile = (0, service_1.encrypted)(body.mobile);
    const encCardId = (0, service_1.encrypted)(body.cardId);
    // ---- ตรวจซ้ำ (ต้อง decode จาก DB มาเช็ค) ----
    const existingProfiles = await prisma.profile.findMany();
    const duplicatedFields = [];
    for (const p of existingProfiles) {
        if ((0, service_1.decrypted)(p.mobile) === body.mobile)
            duplicatedFields.push("mobile");
        if ((0, service_1.decrypted)(p.cardId) === body.cardId)
            duplicatedFields.push("cardId");
    }
    if (duplicatedFields.length > 0) {
        return c.json({ message: `ข้อมูลซ้ำ: ${duplicatedFields.join(", ")}` }, 503);
    }
    // ---- hash password ----
    body.password = await bcrypt.hash(body.password, 12); // แนะนำใช้ 12
    // ---- save to db ----
    body.mobile = encMobile;
    body.cardId = encCardId;
    body.status = false;
    const result = await prisma.profile.create({
        data: body,
    });
    c.status(200);
    return c.json({
        message: "create profile completed",
        data: result,
    });
});
exports.default = app;
