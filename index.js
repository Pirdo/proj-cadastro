const express = require("express");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "/view/"));

const consign = require("consign");
consign().include("controller/routes").into(app);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, resp) {
  resp.send("Bem-vindo ao meu app");
});

app.get("/contato", function (req, resp) {
  resp.send("Pagina de contato do meu app");
});

app.get("/produto", function (req, resp) {
  resp.send("Pagina de produto do meu app");
});

app.get("/dados/:nome/:cargo", function (req, resp) {
  resp.send(
    "<h1>Ola sr(a). " +
      req.params.nome +
      "</h1><h2>Seu cargo é " +
      req.params.cargo +
      "</h2>"
  );
});

// esta  deve ser a última linha quando usamos express
app.listen(8081, function () {
  console.log("Servidor funcionando na url http://localhost:8081");
});
