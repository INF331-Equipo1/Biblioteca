import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Layout from "./layout/Layout";
import { Home } from "./pages/Home/Home";


const getRouter = () => createBrowserRouter([
	{
		element: <Layout />,

		children: [
			{
				path: "/",
				element: <Home />
			}
		]
	}
]);

function App() {
	// loader functions will be called inmediatly when createBrowserRouter is called, if the route is correct
	// to prevent failing because we have no auth-data, defer the router creation to the mounting of the app component
	const [routerInfo, setRouterInfo] = useState({ router: null, idx: 0 });

	useEffect(() => {
		const router = getRouter();
		setRouterInfo((ri) => ({ router, idx: (ri.idx + 1) }));

		// we need to clear the memory of the previous router
		return () => router.dispose();
	}, []);

	if (!routerInfo.router) return null;
	return (
		<RouterProvider
			key={routerInfo.idx} router={routerInfo.router} fallbackElement={
				<div>
                    ...
				</div>
			}
		/>
	);
}

export default App;
