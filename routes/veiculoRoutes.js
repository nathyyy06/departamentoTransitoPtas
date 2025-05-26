const router = require("express").Router();
const veiculoController = require("../controllers/veiculoController");


router.post("/cadastro",veiculoController.cadastrar) ;

router.get("/todos", veiculoController.buscarTodos);

module.exports = router;
