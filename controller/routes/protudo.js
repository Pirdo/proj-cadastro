const produtoBanco = require("../../model/repositories/produtoBD");

const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/produto/cadastro", function (req, res) {
    if (req.query.fail)
      res.render("produto/Cadastro", { mensagem: "Cadastro" });
    else res.render("produto/Cadastro", { mensagem: null });
  });

  app.post("/produto/cadastro/salvar", (req, res) => {
    try {
      const nome = req.body.nome;
      const quantidade = req.body.quantidade;
      const preco = req.body.preco;

      produtoBanco.insertProduto(nome, quantidade, preco);
      res.render("produto/Sucesso", { mensagem: "cadastrado" });
    } catch (error) {
      console.log(error);
      res.render("produto/Cadastro", {
        title: "Cadastro",
        mensagem: "Erro no cadastrado",
      });
    }
  });

  app.get("/edit/produto/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      const produto = await produtoBanco.getProdutoId(id);
      res.render("produto/EditProduto", { mensagem: "", produto });
    } catch (err) {
      next(err);
    }
  });

  app.post("/edit/produto/salvar", (req, res) => {
    var produto = {
      nome: req.body.nome,
      quantidade: req.body.quantidade,
      preco: req.body.preco,
      id: req.body.id,
    };
    try {
      produtoBanco.updateProduto(produto);
      res.render("produto/Sucesso", { mensagem: "alterado" });
    } catch (error) {
      res.render("produto/EditProduto", {
        title: "Edição Cadastro",
        mensagem: "Erro no cadastrado",
      });
    }
  });

  app.get("/lista/produto", async (req, res, next) => {
    try {
      const docs = await produtoBanco.selectProduto();
      res.render("produto/Lista", { mensagem: "Lista de Produtos", docs });
    } catch (err) {
      next(err);
    }
  });

  app.get("/delete/produto/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      await produtoBanco.deleteProduto(id);
      const docs = await produtoBanco.selectProduto();
      res.render("produto/Lista", {
        mensagem: "Produto excluído com sucesso",
        docs,
      });
    } catch (err) {
      next(err);
    }
  });
};
