import { FC, useContext, useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main.tsx";
import { Loader, Pagination, SearchInput } from "../../../shared";
import styles from "./styles.module.scss";
import axios from "axios";
import { AnimeCard } from "../../../entities";
import { observer } from "mobx-react-lite";
import { formattedAnimeData } from "../helpers/formattedAnimeData.ts";

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
	const [loadedPages, setLoadedPages] = useState<Record<string, boolean>>({});
	const [animesPerPage] = useState<number>(10);

	useEffect(() => {
		const fetchAnimeList = async () => {
			store.setLoading(true);
			try {
				const response = await axios.get(
					`http://localhost:5000/api/anime/list-anime?page=${currentPage}&limit=${animesPerPage}`
				);
				const gettedData = formattedAnimeData(response);
				setAnimeData(gettedData);
				setLoadedPages((prev) => ({
					...prev,
					[`page-${currentPage}`]: true
				}));
			} catch (e) {
				console.error(e);
			} finally {
				store.setLoading(false);
			}
		};
		fetchAnimeList();
	}, [currentPage]);


	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		setAnimeData([]);
	};

	// if (store.isLoading) {
	// 	return <Loader />;
	// }

	//!FIX PAGINATION

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<h1 className={styles.title}>Список Аниме</h1>
					<SearchInput />
					<ul className={styles.cards__container}>

						{/*<Pagination*/}
						{/*	animesPerPage={animesPerPage}*/}
						{/*	totalAnimes={18000}*/}
						{/*	paginate={paginate}*/}
						{/*/>*/}
						<AnimeCard animes={animeData} />
						{!store.isLoading &&
							<Pagination
								animesPerPage={animesPerPage}
								totalAnimes={18000}
								paginate={paginate}
								currentPage={currentPage}
							/>
						}

					</ul>
				</div>
			</div>
		</>
	);
});
