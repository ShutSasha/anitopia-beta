import { createBrowserRouter } from "react-router-dom";

import { routes } from "../app/routes/consts";

import { NotFoundPage } from "./not-found";
import { HomePage } from "./home";
import { Registration } from "./registration";
import { Login } from "./login";
import { Profile } from "./profile";
import { RandomAnime } from "./random-anime";
import { AnimeList } from "./anime-list";
import { AnimePage } from "./anime-page";

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
			path: routes.RANDOM_ANIME,
			element: <RandomAnime />,
		},
		{
			path: routes.ANIME_PAGE,
			element: <AnimePage />,
		},
		{
			path: "*",
			element: <NotFoundPage />,
		},
		{
			path: routes.ANIME_LIST,
			element: <AnimeList />,
		},
	].map((route) => ({
		...route,
		ErrorBoundary: NotFoundPage,
	}))
);
