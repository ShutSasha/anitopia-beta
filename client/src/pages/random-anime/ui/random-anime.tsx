import { FC, useContext, useState } from "react";
import { Context } from "../../../main";
import { DefaultButton, Loader } from "../../../shared";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import axios from "axios";
import shikimoriLogo from "../../../assets/shikimori_logo.png";
import imdbLogo from "../../../assets/imdb_logo.png";
import kinopoiskLogo from "../../../assets/kinopoisk_logopng.png";
interface Rating {
	rating: number;
	logo: string;
	height: string;
	width: string;
}

export const RandomAnime: FC = () => {
	const { store } = useContext(Context);
	const [linkAnime, setLinkAnime] = useState<string>("");
	const [posterURL, setPosterURL] = useState<string>("");
	const [titleAnime, setTitleAnime] = useState<string>("");
	const [screenshotsAnime, setScreenshotsAnime] = useState<string[]>([]);
	const [ratings, setRatings] = useState<Rating[] | undefined>(undefined);
	const [typeAnime, setTypeAnime] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(false);
	const [statusAnime, setStatusAnime] = useState<string>("");
	const [airedEpisodes, setAiredEpisodes] = useState<number>();
	const [totalEpisodes, setTotalEpisodes] = useState<number>();
	const [minimalAge, setMinimalAge] = useState<number>();
	const [description, setDescription] = useState<string>("");

	const translateStatus = (statusAnime: string) => {
		const statuses: { [key: string]: string } = {
			released: "Вышел",
			ongoing: "Онгоинг",
		};

		return statuses[statusAnime] || statusAnime;
	};

	const handleClickRandomAnime = () => {
		setDisabled(true);
		store.setLoading(true);
		axios
			.get("http://localhost:5000/api/random-anime")
			.then((res) => {
				console.log(res.data);
				setLinkAnime(res.data.link);
				setPosterURL(res.data.material_data.poster_url);
				setTitleAnime(res.data.title);
				setScreenshotsAnime(res.data.material_data.screenshots);
				setRatings([
					{
						rating: res.data.material_data.imdb_rating,
						logo: imdbLogo,
						height: "35px",
						width: "75px",
					},
					{
						rating: res.data.material_data.shikimori_rating,
						logo: shikimoriLogo,
						height: "25px",
						width: "25px",
					},
					{
						rating: res.data.material_data.kinopoisk_rating,
						logo: kinopoiskLogo,
						height: "25px",
						width: "25px",
					},
				]);
				if (res.data.material_data.anime_kind === "tv") {
					setTypeAnime("ТВ Сериал");
				} else {
					setTypeAnime(res.data.material_data.anime_kind);
				}
				setStatusAnime(
					translateStatus(res.data.material_data.anime_status)
				);
				setTotalEpisodes(res.data.material_data.episodes_total);
				setAiredEpisodes(res.data.last_episode);
				setMinimalAge(res.data.material_data.minimal_age);
				setDescription(res.data.material_data.description);
			})
			.catch((err) => console.error(err));
		setTimeout(() => {
			setDisabled(false);
			store.setLoading(false);
		}, 500);
	};

	if (store.isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.container_random_btn}>
						<DefaultButton
							disabled={disabled}
							text="Случайное аниме"
							onClick={() => handleClickRandomAnime()}
						/>
					</div>
					{linkAnime && (
						<>
							<div className={styles.anime_general_info}>
								<div className={styles.anime_general_info_container}>
									<div className={styles.anime_poster}>
										<img src={posterURL} alt="poster_anime" />
									</div>
									<div className={styles.anime_info_box}>
										<h2 className={styles.title_anime}>
											{titleAnime}
										</h2>
										<hr />
										<ul className={styles.anime_ratings_list}>
											{ratings !== undefined &&
												ratings.map((rating, index) => (
													<>
														{rating.rating && (
															<li
																key={index}
																className={
																	styles.anime_rating_item
																}
															>
																<img
																	style={{
																		width: rating.width,
																		height: rating.height,
																	}}
																	src={rating.logo}
																	alt=""
																/>
																{rating.rating}
															</li>
														)}
													</>
												))}
										</ul>
										<hr />
										<div className={styles.anime_info}>
											<ul className={styles.anime_info_list}>
												<li className={styles.anime_info_item}>
													<p>Статус:</p>
													<span>{statusAnime}</span>
												</li>
												<li className={styles.anime_info_item}>
													<p>Эпизоды:</p>
													<span>
														{airedEpisodes}/
														{totalEpisodes !== 0
															? totalEpisodes
															: "?"}
													</span>
												</li>
												<li className={styles.anime_info_item}>
													<p>Тип</p>
													<span>{typeAnime}</span>
												</li>
												<li className={styles.anime_info_item}>
													<p>Возрастные ограничения:</p>
													<span>
														<div className={styles.minimal_age}>
															{minimalAge
																? `${minimalAge}+`
																: "Нет"}
														</div>
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className={styles.anime_description}>
									Описание: {description ? description : "Нет"}
								</div>
							</div>
							<div className={styles.player_container}>
								<iframe
									src={linkAnime}
									width="610px"
									height="370px"
									allow="autoplay *; fullscreen *"
								></iframe>
							</div>
							{screenshotsAnime && (
								<>
									<h2 className={styles.screens_anime_title}>
										Скриншоты аниме
									</h2>
									<div className={styles.anime_screensots}>
										{screenshotsAnime.map((screen, index) => (
											<div key={index}>
												<img src={screen} alt="" />
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};
