const axios = require("axios");

async function GetDocumentos() {
	try{
		const documentos = await axios.get(
			"https://bibliotecaapiv3.azurewebsites.net/api/Documentos/List"
		);
		return documentos;
	}
	catch(error){
		console.log(error);
	}
}
module.exports = GetDocumentos;