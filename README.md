**Minimal example to test VTEX CLI login.**

Steps:

- Install dependencies: `yarn`
- Start the example: `yarn start`

In case you have a corporate proxy set the environment variables:

- `http_proxy`: Should be defined in case the proxy handles http traffic, examples of values:

```
http_proxy=http://localhost:8888
http_proxy=http://155.12.13.14:5050
```

- `https_proxy`: Should be defined in case the proxy handles https traffic, examples of values:

```
https_proxy=http://localhost:8888
https_proxy=http://155.12.13.14:5050
```

To start the login flow run `yarn start`. You can define the target account on the `CONSTANTS` object, defined at [constants.js](./src/constants.js).

The `main` function on the [app.js](src/app.js) file is the entrypoint of the application.

The requests made are:

- Start login - a request to VTEX ID, defined on the [vtexid.js](src/vtexid.js) file, at the `exports.start`.
- Check if admin login is installed in the current account - a GET to `https://${account}.myvtex.com/_v/segment/admin-login/v1/login`. Defined on the [vtexid.js](src/vtexid.js) file, at `exports.hasAdminLogin`.
- Validate token received on local server (a local server is started at localhost) - a request to VTEX ID, defined on [vtexid.js](src/vtexid.js), at `exports.validate`.
