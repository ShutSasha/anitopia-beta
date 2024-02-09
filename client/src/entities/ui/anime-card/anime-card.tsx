import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ImageWithFallback, Skeleton } from "../../../shared";
import { observer } from "mobx-react-lite";
import { Anime } from "../../../pages/anime-list/ui/anime-list";
import NotLoadedImage from "./assets/6e1420ed-dd20-4ba6-bc4d-965a6d6e9718.png";
import { Link } from "react-router-dom";

interface AnimeCardProps {
	animes: Anime[];
}

export const AnimeCard: FC<AnimeCardProps> = observer(({ animes }) => {
	const [imagesLoaded, setImagesLoaded] = useState<Array<boolean>>(
		new Array(animes.length).fill(false)
	);

	useEffect(() => {
		animes.forEach((anime, index) => {
			const img = new Image();
			img.src = anime.material_data.poster_url;
			img.onload = () => {
				setImagesLoaded(prevState => {
					const newState = [...prevState];
					newState[index] = true;
					return newState;
				});
			};
		});
	}, [animes]);


	return (
		<>
			{animes.map((anime: Anime, index: number) => {
				const updatedTitle = anime.title.includes("ТВ")
					? anime.title.replace("ТВ-", "Сезон ")
					: anime.title;
				const genresString = anime.material_data.genres
					? anime.material_data.genres.join(", ")
					: "";
				console.log(5555);
				return (
					<Link
						to={location.pathname.replace('/anime-list', '/anime/') + anime.id}
						key={anime.id}
						className={styles.animeCard}
					>

						{!imagesLoaded[index] ? (
							<Skeleton/>
						) : (
							<ImageWithFallback
								primarySrc={anime.material_data.poster_url}
								secondarySrc={NotLoadedImage}
								altText={anime.title}
							/>
						)}
						<div className={styles.content}>
							<h3>{updatedTitle}</h3>
							<p className={styles.anime__genres}>{genresString}</p>
							<p className={styles.anime__description}>
								{anime.material_data.description
									? anime.material_data.description
									: "Нет"}
							</p>
							<span>{anime.year}</span>
						</div>
					</Link>
				);
			})}
		</>
	);
});
