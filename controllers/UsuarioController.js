const path = require("path");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");

const {PrismaClient} = require("@prisma/client");
const { useActionState } = require("react");
const client = new PrismaClient();

class UsuarioController{
    static async cadastrar(req, res) {
        const {nome, email, senha} = req.body;

        const salt = bcryptjs.genSaltSync(8);
        const hashSenha = bcryptjs.hashSync(senha, salt);

        const usuario = await client.usuario.create({
            data: {
                nome,
                email,
                senha: hashSenha,
            },
        })

        res.json({
            usuarioId: usuario.id,
        });
    }

    static async login(req, res){
        const {email, senha} = req.body;

        //Verificar se o usuario existe
        const usuario = await client.usuario.findUnique({
            where: {
                email: email,
            }
        });
        if(!usuario){
            return res.json({
                msg: "Usuario não encontrado!",
            });
        }

        //Verificar se a senha esta correta
        const senhaCorreta = bcryptjs.compareSync(senha, usuario.hashSenha);
        if(!senhaCorreta){
            return res.json({
                msg: "Senha incorreta!",
            });
        }

        //Emitir um token
        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_SERVIDOR,{ expiresIn: "1h", });
        res.json({
            msg: "Autenticado!",
            token: token,
        });
    }
}
    
module.exports = veiculoController;