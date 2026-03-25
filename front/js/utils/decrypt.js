const PBKDF2_ITERATIONS = 310_000;

export async function decryptFile(cipherText, salt, iv, password) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey({
    name: "PBKDF2",
    salt,
    iterations: PBKDF2_ITERATIONS,
    hash: "SHA-256",
  },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  )

  const decrypt = await crypto.subtle.decrypt(
    {name: "AES-GCM", iv},
    aesKey,
    cipherText
  );

  return decrypt;
}



