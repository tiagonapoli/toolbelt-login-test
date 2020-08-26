const http = require("axios");
const querystring = require("querystring");

const host = "https://vtexid.vtex.com.br";
// const host = "http://localhost:5000";
const config = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "user-agent": "toolbelt",
    // DEVELOPMENT ONLY
    //  - the cookie routes to VTEX ID Beta env
    //  - remove before release
    "cookie": "vtex-commerce-env=beta",
    "X-Forwarded-For": "127.0.0.1"
  },
};


exports.start = async (account, secretHash, loopbackUrl) => {
  const uri = `${host}/api/vtexid/toolbelt/start?an=${account}`;
  const body = querystring.stringify({
    secretHash,
    loopbackUrl
  })
  const { data } = await http.post(uri, body, config);
  return data;
};

exports.validate = async (account, state, secret, ott) => {
  const uri = `${host}/api/vtexid/toolbelt/validate?an=${account}`;
  const body = querystring.stringify({
    state,
    secret,
    ott
  });
  const { data } = await http.post(uri, body, config);
  return data;
};

exports.hasAdminLogin = async (account) => {
  try {
    const url = `https://${account}.myvtex.com/_v/segment/admin-login/v1/login`
    console.log("GET to ", url)
    const { data } = await http.get(`https://${account}.myvtex.com/_v/segment/admin-login/v1/login`)
    return data.includes('vtex.admin-login')
  } catch (err) {
    console.log(err)
    if (err.response && err.response.status === 404) {
      return false
    }

    throw err
  }
}