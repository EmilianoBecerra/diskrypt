const PBKDF2_ITERATIONS = 310_000;

export async function encryptFile(file, password) {
  const fileBuffer = file.arrayBuffer();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const cipherText = await crypto.subtle.encrypt(
    {
      name: "AES-GCM", iv
    },
    aesKey,
    fileBuffer
  );

  return {
    cipherText: Buffer.from(cipherText),
    salt: Buffer.from(salt),
    iv: Buffer.from(iv)
  };
}
