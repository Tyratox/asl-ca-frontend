## Installation
1. Install the NodeJS dependencies by running `yarn install` or `npm install`
2. Copy the configuration file `.env-example` to `.env` and set the two values to the URL or the backend server. On localhost this can also just be `http://127.0.0.1:3000/graphql` but the TLS client certififcate authentication won't work without nginx (or another reverse proxy webserver). (The `CERT_LOGIN_URL` would be `/authentication/tls-cert`)
3. Start the development server by executing `yarn dev` or `npm run dev`. It will start on port `8080` by default.

## Build
In order to build the webapp, `yarn build` or `npm run build` can be run.

## Export
In order to export the webapp as static files, the app first has to be built. Then the command `export` can be run either using yarn (`yarn export`) or using npm (`npm run export`). This will store the files in the directory `./out`