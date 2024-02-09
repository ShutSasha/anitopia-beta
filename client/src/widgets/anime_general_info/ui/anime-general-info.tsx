import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Rating } from "../../../pages/random-anime/ui/random-anime";
import { SkeletonPoster } from "./Skeletons";

interface AnimeGeneralInfoProps {
	anime: {
		link: string;
		posterURL: string | undefined;
		title: string;
		screenshots: string[];
		type: string;
		status: string;
		airedEpisodes: number | null;
		totalEpisodes: number | null;
		minimalAge: number | null;
		description: string | null;
		genres: string[];
		year: number;
	};
	ratings: Rating[] | undefined;
}

export const AnimeGeneralInfo: FC<AnimeGeneralInfoProps> = ({
	anime,
	ratings,
}) => {
	const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

	useEffect(() => {
		setIsLoadingImage(true);
		const image = new Image();
		image.src = anime.posterURL || "";
		image.onload = () => {
			setIsLoadingImage(false);
		};
	}, [anime.posterURL]);

	return (
		<>
			<div className={styles.anime_general_info}>
				<div className={styles.anime_general_info_container}>
					<div className={styles.anime_poster}>
						{isLoadingImage ? (
							<SkeletonPoster />
						) : (
							<img src={anime.posterURL} alt="poster_anime" />
						)}
					</div>
					<div className={styles.anime_info_box}>
						<h2 className={styles.title_anime}>{anime.title}</h2>
						<hr />
						<ul className={styles.anime_ratings_list}>
							{ratings !== undefined &&
								ratings.map((rating, index) => (
									<div key={index}>
										{rating.rating && (
											<li className={styles.anime_rating_item}>
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
									</div>
								))}
						</ul>
						<hr />
						<div className={styles.anime_info}>
							<ul className={styles.anime_info_list}>
								<li className={styles.anime_info_item}>
									<p>Статус:</p>
									<span>{anime.status}</span>
								</li>
								<li className={styles.anime_info_item}>
									<p>Эпизоды:</p>
									<span>
										{anime.airedEpisodes}/
										{anime.totalEpisodes !== 0
											? anime.totalEpisodes
											: "?"}
									</span>
								</li>
								<li className={styles.anime_info_item}>
									<p>Тип</p>
									<span>{anime.type}</span>
								</li>
								<li className={styles.anime_info_item}>
									<p>Возрастные ограничения:</p>
									<span>
										<div className={styles.minimal_age}>
											{anime.minimalAge
												? `${anime.minimalAge}+`
												: "Нет"}
										</div>
									</span>
								</li>
								<li className={styles.anime_info_item}>
									<p>Жанры:</p>
									<div className={styles.anime_genres_container}>
										<ul className={styles.anime_genres_list}>
											{anime.genres
												? anime.genres.map((item, index) => (
														<li
															className={styles.anime_genre}
															key={index}
														>{`${item} `}</li>
												  ))
												: "Не установлены"}
										</ul>
									</div>
								</li>
								<li className={styles.anime_info_item}>
									<p>Год выпуска:</p>
									<span>{anime.year}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.anime_description}>
					Описание: {anime.description ? anime.description : "Нет"}
				</div>
			</div>
		</>
	);
};
