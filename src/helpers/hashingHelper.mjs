import { createHmac } from "node:crypto";

/**
 * @param {string} value: value to transform in hash
 * @param {string} secret: key to create hash
 * @param {string} algorithm: md5, sha256, ...
 * @param {string} type: hex, ...
 * 
 * This method will retorned to hex hash
*/
const stringToHash = (value, algorithm, secret, type) => {
  const hash = createHmac(algorithm, secret);
  hash.update(value);
  
  return hash.digest(type);
};

export { stringToHash };
