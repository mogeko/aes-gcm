import { crypto } from "@std/crypto/crypto";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import { decodeHex, encodeHex } from "@std/encoding/hex";

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

export async function decrypt(ciphertext: string, password: string) {
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

    const alg = { name: "AES-GCM", iv: decodeHex(ciphertext.slice(0, 24)) };
    const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
        "decrypt",
    ]);

    const ctUint8 = decodeBase64(ciphertext.slice(24));

    const ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);

    return new TextDecoder().decode(ptBuffer);
}
