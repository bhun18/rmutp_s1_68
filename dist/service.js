"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.KEY_SECRET;
const iv = process.env.IV_SECRET;
//ฟังก์ชันเข้ารหัส
const encode = (password) => {
    console.log(`---------------------------encode > `, Buffer.from(key), Buffer.from(iv));
    const encodeCipher = crypto.createCipheriv(algorithm, key, iv);
    // console.log("encodeCipher ", encodeCipher);
    const encrypted = encodeCipher.update(password, 'utf-8', 'base64');
    const final = encrypted + encodeCipher.final('base64');
    console.log("encrypted(final)", final, final.length);
    return final;
};
exports.encode = encode;
//ฟังก์ชันถอดรหัส
const decode = (encryptedStr) => {
    console.log(`---------------------------decode > `, Buffer.from(key), Buffer.from(iv));
    const decodeCipher = crypto.createDecipheriv(algorithm, key, iv);
    // console.log("decodeCipher ", decodeCipher);
    const decrypted = decodeCipher.update(encryptedStr, 'base64', 'utf-8');
    const d_final = decrypted + decodeCipher.final('utf-8');
    console.log("decrypted(final) ", d_final);
    return d_final;
};
exports.decode = decode;
