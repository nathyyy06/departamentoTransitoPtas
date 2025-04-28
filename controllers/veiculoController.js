const path = require("path");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class VeiculoController{
    static formCadastro(req, res) {
        res.render("formVeiculo");
    }

    static async cadastrar(req, res) {
        const {modelo, placa, ano, cor} = req.body

        const veiculo = await client.veiculo.create({data: {
            modelo,
            placa,
            ano: parseInt(ano),
            cor
        }});

        res.redirect("/veiculos/todos");
    }

    static async buscarTodos(req, res) {
       const veiculos = await client.veiculo.findMany({});
      
       res.render("veiculos", {veiculos});

      
    }
}

module.exports = VeiculoController;