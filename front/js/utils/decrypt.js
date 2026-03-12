export const decryptFile = (data, mimeType, password, filename) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(data, password).toString(CryptoJS.enc.Utf8);
    if(!decrypted.startsWith("DISKRYPT:")) {
      return null;
    }
    const base64 = decrypted.slice("DISKRYPT:".length);
    const wordArray = CryptoJS.enc.Base64.parse(base64);
    const typedArray = wordToUint8Array(wordArray);
    const blob = new Blob([typedArray], {type: mimeType});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    return null;
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



