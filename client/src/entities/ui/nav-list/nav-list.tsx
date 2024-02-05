import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Menu } from "./menu";
import { items } from "./consts/nav-names";

export const NavList: FC = () => {
	const [menuActive, setMenuActive] = useState(false);

	return (
		<>
			<div
				className={styles.burger_btn}
				onClick={() => setMenuActive(!menuActive)}
			>
				<span />
			</div>
			<ul className={styles.nav_list}>
				{items.map((item, index) => (
					<Link
						key={index}
						className={styles.nav_list_item}
						to={item.href}
					>
						<li>{item.value}</li>
					</Link>
				))}
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
