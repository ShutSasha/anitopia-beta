import { FC, useContext, useState } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [searchText, setSearchText] = useState<string>("");

	const anime_season = [
		{ text: "TEXT", color: "#D9D9D9" },
		{ text: "TEXT", color: "#FBBFBF" },
		{ text: "TEXT", color: "#FFA3A3" },
		{ text: "TEXT", color: "#FF8989" },
		{ text: "TEXT", color: "#FF7A7A" },
		{ text: "TEXT", color: "#FF6B6B" },
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
								<div className={styles_h.card} key={index}>
									<div
										style={{ backgroundColor: card.color }}
										className={styles_h.card_background}
									></div>
									<div className={styles_h.card_text_block}>
										{card.text}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
});
