const express = require("express");
const open = require("open");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const vtexid = require("./vtexid");
const { CONSTANTS } = require('./constants')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const STATE = {
  loginState: null,
  secret: null,
  secretHash: null,
};

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const finalPage = `
  <!doctype html>
  <html>
    <head>
      <title>Success</title>
      <meta charset="utf-8">
    </head>
    <body>
      Você já pode fechar essa janela.
      You may now close this window.
      Ahora puedes cerrar esta ventana.
    </body>
  </html>`;

app.post("/callback", async (req, res) => {
  console.log(req.body);
  const ott = (req.body || {}).ott;
  const { loginState, secret } = STATE;
  const result = await vtexid.validate(
    CONSTANTS.account,
    loginState,
    secret,
    ott
  );
  console.log(result);
  res.send(finalPage);

  console.log("Finished successfully! You can close this application now")
});

app.listen(8081, function () {
  console.log("Listening on port 8081!");
});

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const alphabetLength = alphabet.length
const createSecret = (length) => {
  let secret = "";
  for (let i = 0; i < length; i++) {
    secret += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }
  return secret;
};

const hashSecret = (secret) =>
  crypto.createHash("sha256").update(secret).digest("base64");

const main = async () => {
  const secret = createSecret(128);
  const secretHash = hashSecret(secret);
  console.log("secret", secret);
  console.log("secretHash", secretHash);
  const loginState = await vtexid.start(
    CONSTANTS.account,
    secretHash,
    CONSTANTS.LOOP_BACK
  );

  console.log("1. Started login")
  await vtexid.hasAdminLogin(CONSTANTS.account)
  console.log("2. Checked if has vtex.admin-login")

  STATE.loginState = loginState;
  STATE.secret = secret;


  const loginPath =
    CONSTANTS.account + ".myvtex.com/_v/segment/admin-login/v1/login";
  const returnUrl = `${CONSTANTS.VTEXID_CALLBACK}?state=${encodeURIComponent(
    loginState
  )}`;
  await open(`https://${loginPath}?returnUrl=${encodeURIComponent(returnUrl)}`);
};

main();
