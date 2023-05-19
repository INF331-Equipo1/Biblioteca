/* eslint-disable indent */
import { render, screen, fireEvent} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {Home}  from "./Home";
import React from "react";
describe("Home Component", () => {
  it("Verificar que se abra el modal de 'Añadir libro' al hacer en el botón +", () => {
    act(() => { render(<Home />); });
    
    // Verificar que el diálogo de 'Crear libro' no esté visible inicialmente
    expect(screen.queryByText("Añadir libro")).toBeNull();

    // Obtener el botón de 'Crear'
    const crearButton = screen.getByLabelText("NuevoLibro");
    
    // Hacer clic en el botón de 'Crear'
    fireEvent.click(crearButton);

    // Verificar que el diálogo de 'Crear libro' esté visible después de hacer clic en el botón
    expect(screen.getByText("Añadir libro")).toBeInTheDocument;
  });
});

