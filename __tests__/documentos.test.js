import { GetDocumentos, CreatDocumento, EditDocumento, DeleteDocumentos } from "../src/apiCalls/documentos";

describe("GetDocumentos", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("obtener los documentos correctamente", async () => {
		const data = {
			"codigo": 200,
			"mensaje": "Lista obtenida con éxito",
			"status": true,
			"item": []
		};
		fetch.mockResponseOnce(JSON.stringify(data));

		const fetchedData = await GetDocumentos();

		expect(fetchedData).toEqual(data);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith("https://bibliotecaapiv3.azurewebsites.net/api/Documentos/List");
	});
});

describe("CreatDocumento", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
  
	it("crea un documento correctamente", async () => {
		const mockDocument = {
			"id_documento": 0,
			"nombre": "string",
			"autor": "string",
			"cantidad": 0,
			"descripcion": "string",
			"foto": "string",
			"editorial": "string",
			"fechaPublicacion": "2023-04-30T18:16:48.031Z",
			"codigoUbicacion": "string"
		};
  
		fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
  
		const response = await CreatDocumento(mockDocument);
  
		expect(response).toEqual({ data: "12345" });
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual("https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Create");
		expect(fetch.mock.calls[0][1]).toEqual({
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(mockDocument)
		});
	});
  
	it("maneja los errores correctamente", async () => {
		fetch.mockReject(() => Promise.reject("Error de API"));
  
		try {
			await CreatDocumento({});
		} catch(e) {
			expect(e).toEqual("Error de API");
		}
  
		expect(fetch.mock.calls.length).toEqual(1);
	});
});

describe("EditDocumento", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
  
	it("edita un documento correctamente", async () => {
		const mockDocument = {
			"id_documento": 0,
			"nombre": "string",
			"autor": "string",
			"cantidad": 0,
			"descripcion": "string",
			"foto": "string",
			"editorial": "string",
			"fechaPublicacion": "2023-04-30T18:16:48.031Z",
			"codigoUbicacion": "string"
		};
  
		fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
		
		const response = await EditDocumento(0, mockDocument);
  
		expect(response).toEqual({ data: "12345" });
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual("https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Edit/0");
		expect(fetch.mock.calls[0][1]).toEqual({
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(mockDocument)
		});
	});
  
	it("maneja los errores correctamente", async () => {
		fetch.mockReject(() => Promise.reject("Error de API"));
  
		try {
			await EditDocumento(0, {});
		} catch(e) {
			expect(e).toEqual("Error de API");
		}
  
		expect(fetch.mock.calls.length).toEqual(1);
	});
});

describe("DeleteDocumentos", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("elimina un documento correctamente", async () => {
		fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
  
		const response = await DeleteDocumentos(0);
  
		expect(response).toEqual({ data: "12345" });
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual("https://bibliotecaapiv3.azurewebsites.net/api/Documentos/Delete/0");
		expect(fetch.mock.calls[0][1]).toEqual({
			method: "DELETE"
		});
	});
  
	it("maneja los errores correctamente", async () => {
		fetch.mockReject(() => Promise.reject("Error de API"));
  
		try {
			await DeleteDocumentos(0);
		} catch(e) {
			expect(e).toEqual("Error de API");
		}
  
		expect(fetch.mock.calls.length).toEqual(1);
	});
});