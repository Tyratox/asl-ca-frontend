const express = require("express");
const path = require("path");

const out = path.join(__dirname, "out");
const app = express();

const paths = ["admin", "login", "logout", "revocation-list"];
const headers = {
  "Content-Security-Policy":
    "default-src 'self' *.imovies.ch localhost:3000 https: http:",
};

const setHeaders = (res) => {
  Object.keys(headers).forEach((header) =>
    res.setHeader(header, headers[header])
  );
};

paths.forEach((p) => {
  app.get(`/${p}`, function (req, res) {
    setHeaders(res);
    res.sendFile(path.join(out, `${p}.html`));
  });
});

app.use(
  express.static(out, {
    setHeaders,
  })
);

console.log("Test server running on http://localhost:8080");
app.listen(8080);
