import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const ButtonLogIn: FC = () => {
	return (
		<>
			<Link to="/login">
				<button className={styles.button}>ВХОД</button>
			</Link>
		</>
	);
};
