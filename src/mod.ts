import { crypto } from "@std/crypto/crypto";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import { decodeHex, encodeHex } from "@std/encoding/hex";

export async function encrypt(plain: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);

  const ptUint8 = new TextEncoder().encode(plain);

  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);

  return encodeHex(iv) + encodeBase64(ctBuffer);
}

export async function decrypt(cipher: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const alg = { name: "AES-GCM", iv: decodeHex(cipher.slice(0, 24)) };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]);

  const ctUint8 = decodeBase64(cipher.slice(24));

  const ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);

  return new TextDecoder().decode(ptBuffer);
}
