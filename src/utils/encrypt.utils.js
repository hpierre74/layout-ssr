import CryptoJS from 'crypto-js';

export const encryptString = string => CryptoJS.AES.encrypt(string, process.env.RAZZLE_SECRET_MESSAGE_KEY).toString();
export const decryptHash = hash => {
  return CryptoJS.AES.decrypt(hash, process.env.RAZZLE_SECRET_MESSAGE_KEY).toString(CryptoJS.enc.Utf8);
};
