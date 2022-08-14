const clienteBanco = require("../../model/repositories/clienteBD");

const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/cliente/cadastro", function (req, res) {
    if (req.query.fail)
      res.render("cliente/Cadastro", { mensagem: "Cadastro" });
    else res.render("cliente/Cadastro", { mensagem: null });
  });

  app.post("/cliente/cadastro/salvar", (req, res) => {
    try {
      const nome = req.body.nome;
      const sobrenome = req.body.sobrenome;

      clienteBanco.insertCliente(nome, sobrenome);
      res.render("cliente/Sucesso", { mensagem: "cadastrado" });
    } catch (error) {
      console.log(error);
      res.render("cliente/Cadastro", {
        title: "Cadastro",
        mensagem: "Erro no cadastrado",
      });
    }
  });

  app.get("/edit/cliente/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      const cliente = await clienteBanco.getClienteId(id);
      res.render("cliente/EditCliente", { mensagem: "", cliente });
    } catch (err) {
      next(err);
    }
  });

  app.post("/edit/cliente/salvar", (req, res) => {
    var cliente = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      id: req.body.id,
    };
    try {
      clienteBanco.updateCliente(cliente);
      res.render("cliente/Sucesso", { mensagem: "alterado" });
    } catch (error) {
      res.render("cliente/EditCliente", {
        title: "Edição Cadastro",
        mensagem: "Erro no cadastrado",
      });
    }
  });

  app.get("/lista/cliente", async (req, res, next) => {
    try {
      const docs = await clienteBanco.selectCliente();
      res.render("cliente/Lista", { mensagem: "Lista de Clientes", docs });
    } catch (err) {
      next(err);
    }
  });

  app.get("/delete/cliente/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      await clienteBanco.deleteCliente(id);
      const docs = await clienteBanco.selectCliente();
      res.render("cliente/Lista", {
        mensagem: "Cliente excluído com sucesso",
        docs,
      });
    } catch (err) {
      next(err);
    }
  });
};