import { FC, useContext, useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main.tsx";
import { Loader, Pagination } from "../../../shared";
import styles from "./styles.module.scss";
import axios from "axios";
import { AnimeCard } from "../../../entities";
import { observer } from "mobx-react-lite";

export interface MaterialData {
	description: string | undefined;
	poster_url: string;
	genres: Array<string>;
}

export interface Anime {
	id: string;
	title: string;
	material_data: MaterialData;
	year: number;
}

export const AnimeList: FC = observer(() => {
	const { store } = useContext(Context);
	const [animeData, setAnimeData] = useState<Anime[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [animesPerPage] = useState<number>(10);

	useEffect(() => {
		const getAnimeList = async () => {
			store.setLoading(true);

			try {
				const response = await axios.get(
					`http://localhost:5000/api/anime-list?page=${currentPage}&limit=${animesPerPage}`
				);
				console.log(response);
				//! fix map with description - undefind
				const formattedAnimeData = response.data.map((anime: any) => ({
					title: anime.title,
					id: anime.id,
					material_data: {
						description: anime.material_data.description
							? anime.material_data.description
							: "Нет",
						poster_url: anime.material_data.poster_url,
						genres: anime.material_data.anime_genres,
					},
					year: anime.year,
				}));
				setAnimeData(formattedAnimeData);
			} catch (e) {
				console.error(e);
			} finally {
				store.setLoading(false);
			}
		};
		getAnimeList();
	}, [currentPage]);

	const lastAnimesIndex = currentPage * animesPerPage;
	const firstAnimesindex = lastAnimesIndex - animesPerPage;
	const currentAnimes = animeData.slice(firstAnimesindex, lastAnimesIndex);

	const paginate = (pageNumber: number) => {
		store.setLoading(true);
		setCurrentPage(pageNumber);
		store.setLoading(false);
	};

	if (store.isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<h1 className={styles.title}>Список Аниме</h1>
					<ul className={styles.cards__container}>
						<AnimeCard animes={currentAnimes} />
						<Pagination
							animesPerPage={animesPerPage}
							totalAnimes={animeData.length}
							paginate={paginate}
						/>
					</ul>
				</div>
			</div>
		</>
	);
});
