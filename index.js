const express = require("express");
const path = require("path");
const app = express();

// Capturar campos enviados por POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal: mostrar o formulário HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "formVeiculo.html"));
});

// Importar as rotas de veículos
const veiculoRoutes = require("./routes/veiculoRoutes");
app.use("/veiculos", veiculoRoutes);

// Porta do servidor
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
