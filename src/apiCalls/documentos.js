export const CreatDocumento = async (document) => {
	try{
		const response = await fetch(
			"https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Create",{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(document)
			}
		);
		if (!response.status) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	}
	catch(error){
		console.log(error);
	}
};

export const EditDocumento = async (document) => {
	try{
		const response = await fetch(
			"https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Edit",{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(document)
			}
		);
		if (!response.status) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	}
	catch(error){
		console.log(error);
	}
};

export const GetDocumentos = async () => {
	try{
		const response = await fetch(
			"https://bibliotecaapiv3.azurewebsites.net/api/Documentos/List"
		);
		const documentos = await response.json();
		return documentos;
	}
	catch(error){
		console.log(error);
	}
};

export const DeleteDocumentos = async (id) => {
	try{
		const response = await fetch(
			`https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Delete?id_documento=${id}`, {
				method: "DELETE"
			}
		);
		if (!response.status) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	}
	catch(error){
		console.log(error);
	}
};