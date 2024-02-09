import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Context } from "../../../main";
import { SkeletonPoster } from "./Skeleton";

interface Screenshots {
	screenshots: string[];
}

export const AnimeScreenshots: FC<Screenshots> = ({ screenshots }) => {
	const [isLoadingScreenshots, setIsLoadingScreenshots] = useState(false);
	const { store } = useContext(Context);

	useEffect(() => {
		setIsLoadingScreenshots(true);
		const image = new Image();

		const srcImg =
			store.anime.animeData.screenshots[screenshots.length - 1] || "";

		image.src = srcImg;

		image.onload = () => {
			setIsLoadingScreenshots(false);
		};
	}, [store.anime.animeData.screenshots]);

	return (
		<>
			<h2 className={styles.screens_anime_title}>Скриншоты аниме</h2>
			<div className={styles.anime_screensots}>
				{screenshots.map((screen, index) => (
					<div key={index}>
						{isLoadingScreenshots ? (
							<SkeletonPoster />
						) : (
							<img src={screen} alt="" />
						)}
					</div>
				))}
			</div>
		</>
	);
};
