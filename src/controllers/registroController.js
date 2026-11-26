var registroModel = require("../models/registroModel");

function cadastrar(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var local = req.body.localServer;
    var data = req.body.dataServer;
    var clima = req.body.climaServer;
    var humorAntes = req.body.humorAntesServer;
    var humorDepois = req.body.humorDepoisServer;
    var idUsuario = req.body.idUsuarioServer;
    var categorias = req.body.categoriasServer;

    var foto = null;
    if (req.file != undefined) {
        foto = `fotos/${req.file.filename}`;
    }

    if (titulo == undefined || descricao == undefined || local == undefined || data == undefined) {
        res.status(400).send("Algum campo de texto está undefined!");
    } else if (clima == undefined || humorAntes == undefined || humorDepois == undefined) {
        res.status(400).send("Clima ou humor está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        registroModel.cadastrar(titulo, descricao, local, data, clima, humorAntes, humorDepois, foto, idUsuario)
            .then(function (resultado) {
                var idRegistro = resultado.insertId;

                if (categorias != undefined && categorias != "") {
                    var vetorCategorias = categorias.split(",");
                    registroModel.cadastrarCategorias(idRegistro, vetorCategorias).catch(function (erro) {
                        console.log(erro);
                    });
                }

                res.json({ idRegistro: idRegistro });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao cadastrar o registro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    registroModel.listar(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar os registros! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPorCategoria(req, res) {
    var idUsuario = req.params.idUsuario;
    var idCategoria = req.params.idCategoria;

    registroModel.listarPorCategoria(idUsuario, idCategoria)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao filtrar os registros! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    listar,
    listarPorCategoria
};