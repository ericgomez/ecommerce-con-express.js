const express = require("express");
const path = require("path");
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

// app
const app = express();

// middlewares
// utilizamos express.json para procesar cuerpos que vienen en formato JSON
app.use(express.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
// app.engine no se necesita por que "pug" ya viene integrado de forma nativa
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect
app.get('/', function(req, res) {
  res.redirect('/products');
});

// server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});