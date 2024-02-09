import { FC, useContext, useEffect, useState } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { handleClickRandomAnime } from "../../random-anime/api/fetchDataAnime";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [searchText, setSearchText] = useState<string>("");
	const [animeSeasonData, setAnimeSeasonData] = useState([]);
	// const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/anime/season-anime"
				);
				console.log(res.data);
				setAnimeSeasonData(res.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const clickAtAnime = (id: string) => {
		handleClickRandomAnime(
			store.anime.setAnime,
			store.anime.setRatingsAnime,
			store.setLoading,
			id
		);
		// navigate(`anime/${id}`);
	};

	if (store.isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles_h.wrapper}>
				<div className={styles_h.container}>
					<div className={styles_h.search_filter_line}>
						<div className={styles_h.search}>
							<input
								className={styles_h.search_input}
								placeholder="НАЙТИ АНИМЕ ПО НАЗВАНИЮ"
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								type="text"
							/>
						</div>
						<div className={styles_h.filter}>
							<button className={styles_h.filter_btn}>
								<span className={styles_h.filter_icon}></span>
								РАСКРЫТЬ ФИЛЬТР
							</button>
						</div>
					</div>
					<div className={styles_h.cards_anime_container}>
						<div className={styles_h.anime_season_block}>
							<h2 className={styles_h.anime_season_title}>
								Аниме зимнего сезона
							</h2>
						</div>
						<div className={styles_h.slider_anime_season}>
							{animeSeasonData &&
								animeSeasonData
									.slice(0, 6)
									.map((card: any, index: number) => (
										<Link
											to={`anime/${card.id}`}
											className={styles_h.card}
											key={index}
											onClick={() => clickAtAnime(card.id)}
										>
											<div
												style={{
													backgroundImage: `url(${card.material_data.poster_url})`,
												}}
												className={styles_h.card_background}
											></div>
											<div
												title={card.title}
												className={styles_h.card_text_block}
											>
												{card.title}
											</div>
										</Link>
									))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
});
