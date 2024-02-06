import { FC, useContext, useState } from "react";
import { Context } from "../../../main";
import { DefaultButton, Loader } from "../../../shared";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import axios from "axios";

export const RandomAnime: FC = () => {
	const { store } = useContext(Context);
	const [linkAnime, setLinkAnime] = useState<string>("");
	const [titleAnime, setTitleAnime] = useState<string>("");
	const [screenshotsAnime, setScreenshotsAnime] = useState<string[]>([]);

	const handleClickRandomAnime = () => {
		axios
			.get("http://localhost:5000/api/random-anime")
			.then((res) => {
				console.log(res.data);
				setLinkAnime(res.data.link);
				setTitleAnime(res.data.title);
				setScreenshotsAnime(res.data.screenshots);
			})
			.catch((err) => console.error(err));
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
							text="Случайное аниме"
							onClick={() => handleClickRandomAnime()}
						/>
					</div>
					{linkAnime && (
						<>
							<div className={styles.anime_general_info}>
								<h2 className={styles.title_anime}>{titleAnime}</h2>
							</div>
							<div className={styles.player_container}>
								<iframe
									src={linkAnime}
									width="610px"
									height="370px"
									allow="autoplay *; fullscreen *"
								></iframe>
							</div>
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
				</div>
			</div>
		</>
	);
};
