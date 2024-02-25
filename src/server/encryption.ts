import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function encryptFields<T extends { [key: string]: any }>(
    data: T,
    ignore?: (keyof T)[]
) {
    const out: { [key: string]: any } = {};
    for (const [k, value] of Object.entries(data)) {
        if ((ignore && ignore.includes(k)) || typeof value != "string") {
            out[k] = data[k];
            continue;
        }

        const iv = randomBytes(16);
        const cipher = createCipheriv(
            "aes-256-cbc",
            Buffer.from(process.env.AES_KEY ?? "", "hex"),
            iv
        );
        out[k] = cipher.update(data[k], "utf-8", "hex");
        out[k] += cipher.final("hex");
        out[k] += iv.toString("hex");
    }
    return out as T;
}

export function decryptFields<T extends { [key: string]: any }>(
    data: T,
    ignore?: (keyof T)[]
) {
    const out: { [key: string]: any } = {};
    for (const [k, value] of Object.entries(data)) {
        if ((ignore && ignore.includes(k)) || typeof value != "string") {
            out[k] = data[k];
            continue;
        }

        const iv = Buffer.from(data[k].substring(data[k].length - 32), "hex");
        const decipher = createDecipheriv(
            "aes-256-cbc",
            Buffer.from(process.env.AES_KEY ?? "", "hex"),
            iv
        );
        out[k] = decipher.update(
            data[k].substring(0, data[k].length - 32),
            "hex",
            "utf-8"
        );
        out[k] += decipher.final("utf-8");
    }
    return out as T;
}
