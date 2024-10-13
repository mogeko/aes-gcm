import { crypto } from "@std/crypto/crypto";
import { encodeBase64 } from "@std/encoding/base64";
import { encodeHex } from "@std/encoding/hex";

export async function encrypt(plaintext: string, password: string) {
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const alg = { name: "AES-GCM", iv };

    const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
        "encrypt",
    ]);

    const ptUint8 = new TextEncoder().encode(plaintext);
    const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);

    return encodeHex(iv) + encodeBase64(ctBuffer);
}
