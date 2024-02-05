import { FC } from "react";
import { Logo } from "../../../shared";
import { NavList } from "../../../entities";
import styles from "./styles.module.scss";

export const Navbar: FC = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.logo}>
				<Logo></Logo>
			</div>
			<NavList></NavList>
		</div>
	);
};
