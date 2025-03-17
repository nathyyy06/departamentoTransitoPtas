const express = require("express");
const app = express();

// Capturar campos enviados po POST
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Wordl")
});
const veiculoRoutes = require("./routes/veiculoRoutes")
app.use("/veiculos", veiculoRoutes);

app.listen(8000, (err) => {
    console.log("Aplicação rodando em localhost:8000")
})


