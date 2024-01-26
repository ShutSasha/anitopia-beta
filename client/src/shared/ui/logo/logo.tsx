import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const Logo: FC = () => {
	return (
		<Link to="/">
			<div className={styles.logo}>
				<p>Anitopia</p>
			</div>
		</Link>
	);
};
