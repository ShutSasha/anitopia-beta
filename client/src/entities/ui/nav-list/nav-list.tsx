import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NavList: FC = () => {
	return (
		<>
			<ul className={styles.nav_list}>
				<Link className={styles.nav_list_item} to="/">
					<li>Главная</li>
				</Link>
				<Link className={styles.nav_list_item} to="/anime">
					<li>Аниме</li>
				</Link>
				<Link className={styles.nav_list_item} to="/manga">
					<li>Манга</li>
				</Link>
				<Link className={styles.nav_list_item} to="/top-100">
					<li>Топ-100</li>
				</Link>
				<Link className={styles.nav_list_item} to="/random-anime">
					<li>Случайное аниме</li>
				</Link>
			</ul>
		</>
	);
};
