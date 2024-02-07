import { FC } from "react";
import styles from "./styles.module.scss";

interface Screenshots {
	screenshots: string[];
}

export const AnimeScreenshots: FC<Screenshots> = ({screenshots}) => {
	return (
		<>
			<h2 className={styles.screens_anime_title}>Скриншоты аниме</h2>
			<div className={styles.anime_screensots}>
				{screenshots.map((screen, index) => (
					<div key={index}>
						<img src={screen} alt="" />
					</div>
				))}
			</div>
		</>
	);
};
