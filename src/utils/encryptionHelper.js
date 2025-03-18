// src/utils/encryptionHelper.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'U5qZP7Tjm/SkdQOj2FkJlw==';   
 
export const encryptText = (text) => {
    if (typeof text !== 'string') {
        text = String(text);  
      }
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return ciphertext.replace(/\+/g, '.').replace(/=/g, '-').replace(/\//g, '~');
};
 
export const decryptText = (encryptedText) => {
    encryptedText = encryptedText.replace(/\./g, '+').replace(/-/g, '=').replace(/~/g, '/');
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
