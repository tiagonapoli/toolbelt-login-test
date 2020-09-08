const http = require('http')

const rawRequest = (account, proxyHost, proxyPort) => {
    const options = {}
    options.host = proxyHost
    options.port = proxyPort
    options.headers = { host: `${account}.myvtex.com` }
    options.path = `https://${account}.myvtex.com/_v/segment/admin-login/v1/login`
    http.get(options, (res) => {
        console.log(res.statusCode)
    })
}

rawRequest('storecomponents', 'localhost', '8888')