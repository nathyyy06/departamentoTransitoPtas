const path = require("path");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class VeiculoController{
    static formCadastro(req, res) {
        res.render("formVeiculo");
    }

    static async cadastrar(req, res) {
        res.send(JSON.stringify(req.body));

        const {modelo, placa, ano, cor} = req.body

        const veiculo = await client.veiculo.create({data: {
            modelo,
            placa,
            ano: parseInt(ano),
            cor
        }});

        res.send({veiculo});
    }

    static async buscarTodos(req, res) {
       const veiculos = await client.veiculo.findMary({});
      
       res.send("usuarios");
    }
}

module.exports = VeiculoController;