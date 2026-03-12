export const encryptWithSecretKey = (file, key) => {
  const wordArray = CryptoJS.lib.WordArray.create(file);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);
  const dataWithSentinel = "DISKRYPT:" + base64;
  return CryptoJS.AES.encrypt(dataWithSentinel, key).toString();
}