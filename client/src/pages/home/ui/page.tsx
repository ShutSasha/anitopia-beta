import { FC, useContext, useEffect, useState } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared";
import background1 from "../../../assets/slider-1.jpg";
import background2 from "../../../assets/slider-2.jpg";
import background3 from "../../../assets/slider-3.jpg";
import background4 from "../../../assets/slider-4.jpg";
import background5 from "../../../assets/slider-5.jpg";
import background6 from "../../../assets/slider-6.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [searchText, setSearchText] = useState<string>("");
	const [animePosters, setAnimePosters] = useState([]);
	const [idAnime, setIdAnime] = useState<string[] | undefined>([
		"serial-54643",
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/anime/season-anime"
				);
				const links = res.data.map(
					(item: any) => item.material_data.poster_url
				);
				const ids = res.data.map((item: any) => item.id);
				setAnimePosters(links);
				setIdAnime(ids);
				console.log(links);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const anime_season = [
		{ text: "Поднятие уровня в одиночку", color: background1 },
		{ text: "Магия и мускулы 2", color: background2 },
		{ text: "Добро пожаловать в класс превосходства 3", color: background3 },
		{ text: "Опасность в моём сердце 2", color: background4 },
		{
			text: "Злодейка девяносто девятого уровня: «Я босс, но не король демонов»",
			color: background5,
		},
		{ text: "Нежеланно бессмертный авантюрист", color: background6 },
	];

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
							{anime_season.map((card, index) => (
								<Link
									to={`anime/${
										idAnime && idAnime[index]
											? idAnime[index]
											: "serial-54643"
									}`}
									className={styles_h.card}
									key={index}
								>
									<div
										style={{
											backgroundImage: animePosters[index]
												? `url(${animePosters[index]})`
												: `url(${card.color})`,
										}}
										className={styles_h.card_background}
									></div>
									<div
										title={card.text}
										className={styles_h.card_text_block}
									>
										{card.text}
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
