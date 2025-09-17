import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { encode, decode } from "./service";  

const prisma = new PrismaClient();
const app = new Hono();

app.get("/", (c) => c.text("Hono!"));
app.get("/about", (c) => {
  return c.json({ message: "Tanusphol Kruthong " });
});

//GET profiles
app.get("/profile", async (c) => {
  const profiles = await prisma.profile.findMany();

  const decodedProfiles = profiles.map((p) => ({
    ...p,
    mobile: decode(p.mobile),
    cardId: decode(p.cardId),
  }));

  return c.json(decodedProfiles);
});

//CREATE profile
app.post("/profile", async (c) => {
  const body = await c.req.json();
  console.log("input of profile", body);
  console.log("body.password(original)", body.password);

  // encode sensitive fields
  const encMobile = encode(body.mobile);
  const encCardId = encode(body.cardId);
  // ---- ตรวจซ้ำ (ต้อง decode จาก DB มาเช็ค) ----
  const existingProfiles = await prisma.profile.findMany();
  const duplicatedFields: string[] = [];

  for (const p of existingProfiles) {
    if (decode(p.mobile) === body.mobile) duplicatedFields.push("mobile");
    if (decode(p.cardId) === body.cardId) duplicatedFields.push("cardId");
  }

  if (duplicatedFields.length > 0) {
    return c.json(
      { message: `ข้อมูลซ้ำ: ${duplicatedFields.join(", ")}` },
      503
    );
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

app.get("/profile/:id", async (c) => {
    //get some data from db
    const id = c.req.param('id');
    console.log('id ', id);
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            id: id
        }
    });
    delete profile.password;
    console.log('cardId', profile.cardId.length);
    console.log('mobile', profile.mobile.length);
    profile.cardId = decode(profile.cardId);
    profile.mobile = decode(profile.mobile);
    // profile.mobile =

    return c.json({
        message: "get data completed",
        data: profile
    }, 200);
});

export default app;