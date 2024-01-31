import { FC, useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { Context } from "./main";

export const App: FC = () => {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.checkAuth();
		}
	}, []);

	return <RouterProvider router={router} />;
};
