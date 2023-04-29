import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const Layout = () => {
	const navigate = useNavigate();

	const start =
	<Button className="flex gap-2 align-items-center" text onClick={() => navigate("/")}>
		<span className="font-bold text-lg">
			SmartLib
		</span>
		<i className="pi pi-book" style={{ fontSize: "1.5rem" }} />
	</Button>;

	return (
		<div className="App">
			<div className="card mb-2">
				<Menubar start={start} />
			</div>
			<div className="p-2">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
