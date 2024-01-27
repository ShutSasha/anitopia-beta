import { createBrowserRouter } from "react-router-dom";

import { routes } from "../app/routes/consts";

import { NotFoundPage } from "./not-found";
import { HomePage } from "./home";

export const router = createBrowserRouter(
	[
		{
			path: routes.HOME,
			element: <HomePage />,
		},
		{
			path: "*",
			element: <NotFoundPage />,
		},
	].map((route) => ({
		...route,
		ErrorBoundary: NotFoundPage,
	}))
);
