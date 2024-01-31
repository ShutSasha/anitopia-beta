import { createBrowserRouter } from "react-router-dom";

import { routes } from "../app/routes/consts";

import { NotFoundPage } from "./not-found";
import { HomePage } from "./home";
import { Registration } from "./registration";
import { Login } from "./login";
import { Profile } from "./profile";

export const router = createBrowserRouter(
	[
		{
			path: routes.HOME,
			element: <HomePage />,
		},
		{
			path: routes.REGISTRATION,
			element: <Registration />,
		},
		{
			path: routes.LOGIN,
			element: <Login />,
		},
		{
			path: routes.PROFILE,
			element: <Profile />,
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
