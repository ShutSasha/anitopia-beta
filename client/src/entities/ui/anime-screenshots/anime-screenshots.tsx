import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { SkeletonPoster } from "./Skeleton";

interface Screenshots {
	screenshots: string[];
}

export const AnimeScreenshots: FC<Screenshots> = ({ screenshots }) => {
	const [isLoadingScreenshots, setIsLoadingScreenshots] = useState(false);

	useEffect(() => {
		setIsLoadingScreenshots(true);
		const image = new Image();
		console.log("screens", screenshots);
		const srcImg = screenshots[screenshots.length - 1] || "";

		image.src = srcImg;

		image.onload = () => {
			setIsLoadingScreenshots(false);
		};
	}, [screenshots]);

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
