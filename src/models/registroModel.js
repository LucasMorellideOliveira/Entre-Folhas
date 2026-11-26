var database = require("../database/config");

function cadastrar(titulo, descricao, local, data, clima, humorAntes, humorDepois, foto, idUsuario) {
    var valorFoto = "NULL";
    if (foto != null) {
        valorFoto = `'${foto}'`;
    }
    var instrucaoSql = `
        INSERT INTO registro (titulo, descricao, local_registro, data_registro, clima, humor_antes, humor_depois, foto, fkUsuario)
        VALUES ('${titulo}', '${descricao}', '${local}', '${data}', '${clima}', ${humorAntes}, ${humorDepois}, ${valorFoto}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarCategorias(idRegistro, categorias) {
    var valores = "";
    for (var i = 0; i < categorias.length; i++) {
        if (i > 0) {
            valores += ", ";
        }
        valores += `(${idRegistro}, ${categorias[i]})`;
    }
    var instrucaoSql = `INSERT INTO registro_categoria (fkRegistro, fkCategoria) VALUES ${valores};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT idRegistro, titulo, descricao, local_registro AS local,
               DATE_FORMAT(data_registro, '%d/%m/%Y') AS data,
               clima, humor_antes AS humorAntes, humor_depois AS humorDepois,
               foto AS capa
        FROM registro
        WHERE fkUsuario = ${idUsuario}
        ORDER BY data_registro DESC, idRegistro DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    cadastrarCategorias,
    listar
};
