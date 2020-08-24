const http = require("axios");

const host = "https://vtexid.vtex.com.br";
// const host = "http://localhost:5000";
const config = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "user-agent": "toolbelt",
    // DEVELOPMENT ONLY
    //  - the cookie routes to VTEX ID Beta env
    //  - remove before release
    cookie: "vtex-commerce-env=beta",
    "X-Forwarded-For": "127.0.0.1",
  },
};

exports.start = async (account, secretHash, loopbackUrl) => {
  const uri = `${host}/api/vtexid/toolbelt/start?an=${account}`;
  const { body } = await http.post(uri, {
    form: {
      secretHash,
      loopbackUrl,
    },
    responseType: "json",
    headers: config.headers,
  });
  console.log(body);
  return body;
};

exports.validate = async (account, state, secret, ott) => {
  const uri = `${host}/api/vtexid/toolbelt/validate?an=${account}`;
  const { body } = await http.post(uri, {
    form: {
      state,
      secret,
      ott,
    },
    headers: config.headers,
  });
  return body;
};
