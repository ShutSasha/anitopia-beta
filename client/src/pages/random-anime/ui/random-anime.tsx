import { FC, useContext } from "react";
import { Context } from "../../../main";
import { Loader } from "../../../shared";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";

export const RandomAnime: FC = () => {
	const { store } = useContext(Context);

	if (store.isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<iframe
						src="//kodik.cc/find-player"
						width="610px"
						height="370px"
						frameborder="0"
						allowfullscreen
						allow="autoplay *; fullscreen *"
					></iframe>
				</div>
			</div>
		</>
	);
};
