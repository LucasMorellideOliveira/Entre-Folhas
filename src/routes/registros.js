var express = require("express");
var router = express.Router();

var upload = require("../config/configUpload");
var registroController = require("../controllers/registroController");

router.post("/cadastrar", upload.single("foto"), function (req, res) {
    registroController.cadastrar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    registroController.listar(req, res);
});

router.get("/listar/:idUsuario/:idCategoria", function (req, res) {
    registroController.listarPorCategoria(req, res);
});

module.exports = router;
