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
			<p className={styles.text}>Ошибка 404. Вы скорее всего, перешли не на ту страничку</p>
			<Link to="/">
				<ButtonReturn />
			</Link>
			<img src={notFoundImg} className={styles.img} alt="404 not found" />
		</div>
	);
});
