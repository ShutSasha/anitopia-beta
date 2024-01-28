import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NavList: FC = () => {
	return (
		<>
			<ul className={styles.nav_list}>
				<li>
					<Link className={styles.nav_list_item} to="/anime">
						Аниме
					</Link>
				</li>
				<li>
					<Link className={styles.nav_list_item} to="/manga">
						Манга
					</Link>
				</li>
				<li>
					<Link className={styles.nav_list_item} to="/top-100">
						Топ-100
					</Link>
				</li>
				<li>
					<Link className={styles.nav_list_item} to="/random-anime">
						Случайное аниме
					</Link>
				</li>
			</ul>
		</>
	);
};
