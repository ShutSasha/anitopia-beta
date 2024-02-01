import { FC, useContext } from "react";
import notFoundImg from "./assets/404.png";
import styles from "./style.module.scss";
import { ButtonReturn, Loader } from "../../shared";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

export const NotFoundPage: FC = observer(() => {
	const { store } = useContext(Context);

	if (store.isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<img src={notFoundImg} className={styles.img} alt="404 not found" />
			<p className={styles.text}>Error 404. Page not found</p>
			<Link to="/">
				<ButtonReturn />
			</Link>
		</div>
	);
});
