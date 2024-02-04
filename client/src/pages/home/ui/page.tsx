import { FC, useContext, useState } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [searchText, setSearchText] = useState<string>("");

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
				</div>
			</div>
		</>
	);
});
