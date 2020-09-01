const http = require('http')

const rawRequest = (proxyHost, proxyPort) => {
    const options = {}
    options.host = proxyHost
    options.port = proxyPort
    options.headers = { host: 'samsungbr.myvtex.com' }
    options.path = 'https://samsungbr.myvtex.com/_v/segment/admin-login/v1/login'
    http.get(options, (res) => {
        console.log(res.statusCode)
    })
}

rawRequest('localhost', '8888')