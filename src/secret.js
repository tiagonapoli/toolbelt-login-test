const crypto = require("crypto");

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const alphabetLength = alphabet.length

function createSecret(length) {
  var result = "";
  for (var i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }
  return result;
}

const secret = createSecret(128);
const bytes = Buffer.from(secret, "ascii");
const hash = crypto.createHash("sha256").update(secret).digest("base64");

console.log(secret);
console.log(bytes);
console.log(hash);
