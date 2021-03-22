const express = require("express");
const app = express();

app.get("/", function(req, res, next) {
  // Podemos imprimir string y en este caso JSON
  res.send({ hello:  "world" });
});

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});