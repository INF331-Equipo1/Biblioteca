const GetDocumentos = require("../src/funcionesTest/documentos");
jest.mock("axios");
const axios = require("axios");

describe("CRUD documentos", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	it("Case A: Get lista documentos", async () => {
		// Set up the Axios mock response
		axios.get.mockResolvedValue({
			"codigo":200,
			"mensaje":"Lista obtenida con éxito",
			"status":true,
			"item":[]
		});

		/*
            The expected result should match the return from your Lambda function.
        */
		const expectedBody = {
			"codigo":200,
			"mensaje":"Lista obtenida con éxito",
			"status":true,
			"item":[]
		};
		const result = await GetDocumentos();

		// Compare the result with the expected result
		expect(axios.post).toHaveBeenCalled();
		expect(JSON.parse(result.body)).toEqual(expectedBody);
		//expect(JSON.parse(result.statusCode)).toEqual(HTTP_SUCCESS_CODE);
	});
});