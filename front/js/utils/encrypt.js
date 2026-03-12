export const encryptWithSecretKey = (file, key) => {
  const wordArray = CryptoJS.lib.WordArray.create(file);
  const crypt = CryptoJS.AES.encrypt(wordArray, key).toString();
  return crypt;
}