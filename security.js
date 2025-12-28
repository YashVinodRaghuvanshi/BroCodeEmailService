const CryptoJS =  require("crypto-js");

const SECRET_KEY = process.env.SECRETKEY;

const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
};

const decrypt = (cipherText) => {
  const encryptedFromQuery = decodeURIComponent(cipherText);
  const bytes = CryptoJS.AES.decrypt(encryptedFromQuery, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {encrypt, decrypt}
