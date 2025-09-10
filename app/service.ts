import * as crypto from "crypto";

const algorithm = "aes-256-cbc";
// key ต้องเป็น Buffer ขนาด 32 bytes (256 bit)
const key = "12345678901234567890123456789012"; 
console.log(`key: ${key.toString()}`);

const iv = crypto.randomBytes(16);
console.log(`iv: ${iv.toString("hex")}`);

const password = "1password1234";

// --- เข้ารหัส ---
const encode = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
let encrypted = encode.update(password, "utf-8", "base64");
encrypted += encode.final("base64");
console.log("encrypted:", encrypted);

// --- ถอดรหัส ---
const decode = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
let decrypted = decode.update(encrypted, "base64", "utf-8");
decrypted += decode.final("utf-8");
console.log("decrypted:", decrypted);
