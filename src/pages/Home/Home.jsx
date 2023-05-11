import React, { useEffect } from "react";
import { Image } from "primereact/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
//import { CreatDocumento } from "../../apiCalls/documentos";
import { GetDocumentos } from "../../apiCalls/documentos";



export const Home = () => {
	const [bookDialog, setBookDialog] = useState(false); 
	const [deleteBookDialog, setDeleteBookDialog] = useState(false); 
	const [selectedBook, setSelectedBook] = useState();
	
	const [books, setBooks] = useState([]);
	const updateBooks = () => {
		GetDocumentos().then((documents) => {
			setBooks(documents.item);
		});
	};
	useEffect(() => {
		updateBooks();
	},[]);
	const editBook = (rowData) => {
		setSelectedBook(rowData);
		setBookDialog(true);
	};
	const deleteBook = (rowData) => {
		setSelectedBook(rowData);
		setDeleteBookDialog(true);
	};
	const acciones = (rowData) => {
		return (
			<>
				<Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editBook(rowData)}/>
				<Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteBook(rowData)} />
			</>
		);
	};
	const deleteBookDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteBookDialog(false)} />
			<Button label="Si" icon="pi pi-check" className="p-button-text" onClick={() => setDeleteBookDialog(false)} />
		</>
	);

	const tableHeader = (
		<div className="flex justify-content-between flex-wrap">
			<div className="flex align-items-center justify-content-center">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText placeholder="Search" />
				</span>
			</div>
			<div className="flex align-items-center justify-content-center">
				<Button icon="pi pi-plus" aria-label="Filter"/>
			</div>
		</div>
	);


	return (
		<div>
			<div className="card">
				<DataTable header={tableHeader} value={books} responsiveLayout="scroll">
					<Column field="id_documento" header="ID"></Column>
					<Column header="Portada" body={(rowData) => {
						return(
							<Image src={rowData.foto} zoomSrc={rowData.foto} alt="Portada" width="80" preview />
						);
					}
					}></Column>
					<Column field="nombre" header="Nombre"></Column>
					<Column field="autor" header="Autor"></Column>
					<Column field="cantidad" header="Cantidad disponible"></Column>
					<Column field="editorial" header="Editorial"></Column>
					<Column field="fechaPublicacion" header="Fecha de Publicación"></Column>
					<Column body={acciones} headerStyle={{ minWidth: "10rem" }}></Column>
				</DataTable>
			</div>
			<Dialog 
				visible={deleteBookDialog} style={{ width: "500px" }} 
				header="Confirmar" modal onHide={() => setDeleteBookDialog(false)}
				footer={deleteBookDialogFooter}
			>
				<div className="flex align-items-center justify-content-center">
					<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
					{selectedBook ? <span>
                                    ¿Estas seguro que quieres eliminar <b>{selectedBook.nombre}</b>?
					</span>: null}
				</div>
			</Dialog>
			<Dialog visible={bookDialog} style={{ width: "500px" }} header="Libro" modal className="p-fluid" onHide={() => setBookDialog(false)}>
				{selectedBook ? <img src={selectedBook.foto} alt="portada" width="150" className="mt-0 mx-auto mb-5 block shadow-2" /> : null}
				{selectedBook ? <div className="field">
					<label htmlFor="nombre">Nombre</label>
					<InputText id="nombre" value={selectedBook.nombre} required autoFocus />
				</div>: null}
				{selectedBook ? <div className="field">
					<label htmlFor="descripcion">Descripcion</label>
					<InputTextarea id="descripcion" value={selectedBook.descripcion} required autoFocus />
				</div>:null}
			</Dialog>
		</div>
	);
};