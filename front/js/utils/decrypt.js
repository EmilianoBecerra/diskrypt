export const decryptFile = (data, mimeType, password, filename) => {
  try {
    const bytesDesencriptados = CryptoJS.AES.decrypt(data, password);

    if (!bytesDesencriptados.sigBytes || bytesDesencriptados.sigBytes <= 0) {
      throw new Error("Contraseña incorrecta");
    }
    const typedArray = wordToUint8Array(bytesDesencriptados);

    const origanlFile = new Blob([typedArray], { type: mimeType });

    const url = URL.createObjectURL(origanlFile);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al transformar el archivo");
  }
}


function wordToUint8Array(wordArray) {
  const l = wordArray.sigBytes;
  const words = wordArray.words;
  const result = new Uint8Array(l);
  for (let i = 0; i < l; i++) {
    result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return result;
}



