import { FC, useContext, useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main.tsx";
import { Loader, Pagination } from "../../../shared";
import styles from "./styles.module.scss";
import axios from "axios";
import { AnimeCard } from "../../../entities";
import { observer } from "mobx-react-lite";

interface MaterialData {
	description?: string;
	poster_url: string;
	genres: Array<string>;
}

interface Anime {
	title: string;
	material_data: MaterialData;
	year: number;
	id: string;
}

export const AnimeList: FC = observer(() => {
	const { store } = useContext(Context);
	const [animeData, setAnimeData] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [animesPerPage] = useState<number>(10);

	useEffect(() => {
		const getAnimeList = async () => {
			store.setLoading(true);
			console.log(store.isLoading);
			try {
				const response = await axios.get(`http://localhost:5000/api/anime-list`, {
					params: {
						page: currentPage,
						limit: animesPerPage
					}
				});
				const formattedAnimeData = response.data.map((anime: any) => ({
					title: anime.title,
					id: anime.id,
					material_data: {
						description: anime.material_data.description,
						poster_url: anime.material_data.poster_url,
						genres: anime.material_data.anime_genres
					},
					year: anime.year
				}));
				console.log(formattedAnimeData);
				setAnimeData(formattedAnimeData);
			} catch (e) {
				console.error(e);
			} finally {
				store.setLoading(false);
				console.log(store.isLoading);
			}
		};
		getAnimeList();
	}, [currentPage]);

	const lastAnimesIndex = currentPage * animesPerPage;
	const firstAnimesindex = lastAnimesIndex - animesPerPage;
	const currentAnimes = animeData.slice(firstAnimesindex, lastAnimesIndex);

	const paginate = (pageNumber: number) => {
		store.setLoading(true);
		//setLoading(true);
		setCurrentPage(pageNumber);
		store.setLoading(false);
	};

	if (store.isLoading || loading) {
		<Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<h1 className={styles.title}>Список Аниме</h1>
					<ul className={styles.cards__container}>
						<AnimeCard animes={currentAnimes} loading={loading} />
						<Pagination animesPerPage={animesPerPage} totalAnimes={animeData.length} paginate={paginate} />
					</ul>
				</div>
			</div>
		</>
	);
});
