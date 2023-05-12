import React, { useEffect } from "react";
//import { Image } from "primereact/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { CreatDocumento } from "../../apiCalls/documentos";
import { GetDocumentos } from "../../apiCalls/documentos";
import { DeleteDocumentos } from "../../apiCalls/documentos";
import { EditDocumento } from "../../apiCalls/documentos";
import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";



export const Home = () => {
	const [showEditBook, setShowEditBook] = useState(false); 
	const [showCreatBook, setShowCreatBook] = useState(false); 
	const [deleteBookDialog, setDeleteBookDialog] = useState(false); 
	const [selectedBook, setSelectedBook] = useState();
	const [loading, setLoading] = useState(false);
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filteredValue, setFilteredValue] = useState();
	
	const [books, setBooks] = useState([]);
	useEffect(() => {
		setGlobalFilterValue("");
		GetDocumentos().then((documents) => {
			setBooks(documents.item);
			setFilteredValue(documents.item);
		});
	},[]);


	const onFilter = (e) => {
		const value = e.target.value;
		setGlobalFilterValue(value);
		if (value.length == 0) {
			setFilteredValue(books);
		} else {
			const filtered = books.filter((book) => {
				return book.nombre.toLowerCase().includes(value);
			});
			console.log(filtered);
			setFilteredValue(filtered);
		}
	};
	const editBook = (rowData) => {
		formik.values.id_documento = rowData.id_documento;
		formik.values.nombre = rowData.nombre;
		formik.values.autor = rowData.autor;
		formik.values.cantidad = rowData.cantidad;
		formik.values.editorial = rowData.editorial;
		formik.values.fechaPublicacion = new Date(rowData.fechaPublicacion);
		formik.values.codigoUbicacion = rowData.codigoUbicacion;
		setShowEditBook(true);
	};
	const firstDeleteBook = (rowData) => {
		setSelectedBook(rowData);
		setDeleteBookDialog(true);
	};
	const secondDeleteBook = () => {
		DeleteDocumentos(selectedBook.id_documento).then(() =>{
			GetDocumentos().then((documents) => {
				setBooks(documents.item);
				setFilteredValue(documents.item);
				setGlobalFilterValue("");
			});
			setDeleteBookDialog(false);
			setSelectedBook();
		});
	};
	const acciones = (rowData) => {
		return (
			<>
				<Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editBook(rowData)}/>
				<Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => firstDeleteBook(rowData)} />
			</>
		);
	};
	const deleteBookDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteBookDialog(false)} />
			<Button label="Si" icon="pi pi-check" className="p-button-text" onClick={() => secondDeleteBook()} />
		</>
	);

	const tableHeader = (
		<div className="flex justify-content-between flex-wrap">
			<div className="flex align-items-center justify-content-center">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText placeholder="Buscar por nombre" value={globalFilterValue} onChange={onFilter}/>
				</span>
			</div>
			<div className="flex align-items-center justify-content-center">
				<Button icon="pi pi-plus" aria-label="Filter" onClick={() => setShowCreatBook(true)}/>
			</div>
		</div>
	);

	const formik = useFormik({
		initialValues: {
			"id_documento": 0,
			"nombre": "",
			"autor": "",
			"cantidad": "",
			"descripcion": "",
			"foto": "",
			"editorial": "",
			"fechaPublicacion": "",
			"codigoUbicacion": ""
		},
		onSubmit: (data) => {
			data.fechaPublicacion = new Date(data.fechaPublicacion).toISOString();
			data.cantidad = parseInt(data.cantidad);
			setLoading(true);
			if (showEditBook) {
				EditDocumento(data).then(() => {
					GetDocumentos().then((documents) => {
						setBooks(documents.item);
						setFilteredValue(documents.item);
						setGlobalFilterValue("");
					});
					setLoading(false);
					setShowEditBook(false);
				});
			} else if (showCreatBook) {
				CreatDocumento(data).then(() => {
					GetDocumentos().then((documents) => {
						setBooks(documents.item);
						setFilteredValue(documents.item);
						setGlobalFilterValue("");
					});
					setLoading(false);
					setShowCreatBook(false);
				});
			}

			formik.resetForm();
		}
	});
	const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
	};


	return (
		<div>
			<div className="card">
				<DataTable header={tableHeader} value={filteredValue} responsiveLayout="scroll">
					<Column field="id_documento" header="ID"></Column>
					{/* <Column header="Portada" body={(rowData) => {
						return(
							<Image src={rowData.foto} zoomSrc={rowData.foto} alt="Portada" width="80" preview />
						);
					}
					}></Column> */}
					<Column field="nombre" header="Nombre"></Column>
					<Column field="autor" header="Autor"></Column>
					<Column field="cantidad" header="Cantidad disponible"></Column>
					<Column field="editorial" header="Editorial"></Column>
					<Column field="fechaPublicacion" header="Fecha de Publicación"></Column>
					<Column field="codigoUbicacion" header="Codigo de ubicación"></Column>
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
			<Dialog visible={showEditBook} style={{ width: "500px" }} header="Editar libro" modal className="p-fluid" onHide={() => setShowEditBook(false)}>
				<BlockUI blocked={loading} template={<ProgressSpinner />}>
					<form onSubmit={formik.handleSubmit} className="p-fluid">
						<div className="field">
							<label htmlFor="autor">Autor</label>
							<InputText id="autor" name="autor" value={formik.values.autor} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("autor")}
						</div>
						<div className="field">
							<label htmlFor="cantidad">Cantidad</label>
							<InputText id="cantidad" name="cantidad" value={formik.values.cantidad} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("cantidad")}
						</div>
						<div className="field">
							<label htmlFor="editorial">Editorial</label>
							<InputText id="editorial" name="editorial" value={formik.values.editorial} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("editorial")}
						</div>
						<div className="field">
							<label htmlFor="fechaPublicacion">Fecha de publicacion</label>
							<Calendar id="fechaPublicacion" name="fechaPublicacion" value={formik.values.fechaPublicacion} onChange={formik.handleChange} dateFormat="yy-mm-dd" required/>
							{getFormErrorMessage("fechaPublicacion")}
						</div>
						<div className="field">
							<label htmlFor="codigoUbicacion">Codigo de ubicacion</label>
							<InputText id="codigoUbicacion" name="codigoUbicacion" value={formik.values.codigoUbicacion} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("codigoUbicacion")}
						</div>
						<Button type="submit" label="Editar" className="mt-2" />
					</form>
				</BlockUI>
			</Dialog>
			<Dialog visible={showCreatBook} style={{ width: "500px" }} header="Añadir libro" modal className="p-fluid" onHide={() => setShowCreatBook(false)}>
				<BlockUI blocked={loading} template={<ProgressSpinner />}>
					<form onSubmit={formik.handleSubmit} className="p-fluid">
						<div className="field">
							<label htmlFor="nombre">Nombre</label>
							<InputText id="nombre" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("name")}
						</div>
						<div className="field">
							<label htmlFor="autor">Autor</label>
							<InputText id="autor" name="autor" value={formik.values.autor} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("autor")}
						</div>
						<div className="field">
							<label htmlFor="cantidad">Cantidad</label>
							<InputText id="cantidad" name="cantidad" value={formik.values.cantidad} onChange={formik.handleChange} autoFocus required min={0} max={100}/>
							{getFormErrorMessage("cantidad")}
						</div>
						<div className="field">
							<label htmlFor="descripcion">Descripcion</label>
							<InputTextarea id="descripcion" value={formik.values.descripcion} onChange={formik.handleChange} autoFocus required/>
						</div>
						<div className="field">
							<label htmlFor="editorial">Editorial</label>
							<InputText id="editorial" name="editorial" value={formik.values.editorial} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("editorial")}
						</div>
						<div className="field">
							<label htmlFor="fechaPublicacion">Fecha de publicacion</label>
							<Calendar id="fechaPublicacion" name="fechaPublicacion" value={formik.values.fechaPublicacion} onChange={formik.handleChange} dateFormat="yy-mm-dd" required/>
							{getFormErrorMessage("fechaPublicacion")}
						</div>
						<div className="field">
							<label htmlFor="codigoUbicacion">Codigo de ubicacion</label>
							<InputText id="codigoUbicacion" name="codigoUbicacion" value={formik.values.codigoUbicacion} onChange={formik.handleChange} autoFocus required/>
							{getFormErrorMessage("codigoUbicacion")}
						</div>
						<Button type="submit" label="Crear" className="mt-2" />
					</form>
				</BlockUI>
			</Dialog>
		</div>
	);
};