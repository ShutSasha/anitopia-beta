import { FC, useContext, useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main.tsx";
import { DefaultButton, Loader, Pagination } from "../../../shared";
import styles from "./styles.module.scss";
import axios from "axios";
import { AnimeCard } from "../../../entities";
import { observer } from "mobx-react-lite";

interface MaterialData {
	description: string;
	poster_url: string;
	genres: Array<string>;
}

interface Anime {
	title: string;
	material_data: MaterialData;
	year: number;
}

export const AnimeList: FC = observer(() => {
	const { store } = useContext(Context);
	const [animeData, setAnimeData] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [animesPerPage] = useState<number>(2);


	useEffect(() => {
		const getAnimeList = async () => {

			await axios.get("http://localhost:5000/api/anime-list")
				.then(res => {
					setLoading(true);
					const formattedAnimeData = res.data.map((anime:any) => ({
						title: anime.title,
						material_data: {
							description: anime.material_data.description,
							poster_url: anime.material_data.poster_url,
							genres: anime.material_data.anime_genres
						},
						year: anime.year
					}));
					setAnimeData(formattedAnimeData);
					setLoading(false);
					console.log(res.data);
				}).catch(e => {
					console.error(e);
				});
		};
		getAnimeList();
	}, []);

	const lastAnimesIndex = currentPage * animesPerPage;
	const  firstAnimesindex = lastAnimesIndex - animesPerPage;
	const  currentAnimes = animeData.slice(firstAnimesindex,lastAnimesIndex)

	const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

	if (store.isLoading) {
		<Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<h1 className={styles.title}>Список Аниме</h1>
					<ul>
						<AnimeCard animes={currentAnimes} loading={loading}/>
						<Pagination animesPerPage={animesPerPage} totalAnimes={animeData.length} paginate={paginate}/>
					</ul>
				</div>
			</div>
		</>
	);
});
