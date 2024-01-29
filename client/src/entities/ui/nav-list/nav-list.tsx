import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Menu } from "./menu";
export const NavList: FC = () => {
	const [menuActive, setMenuActive] = useState(false);

	const items = [
		{ value: "Главная", href: "/" },
		{ value: "Аниме", href: "/anime" },
		{ value: "Манга", href: "/manga" },
		{ value: "Топ-100", href: "/top-100" },
		{ value: "Случайное аниме", href: "/random-anime" },
	];
	return (
		<>
			<div
				className={styles.burger_btn}
				onClick={() => setMenuActive(!menuActive)}
			>
				<span />
			</div>
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
			<Menu
				active={menuActive}
				setActive={setMenuActive}
				header={"Anitopia"}
				items={items}
			/>
		</>
	);
};
