import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
export const ButtonSignUp: FC = () => {
	return (
		<>
			<Link to="/registration">
				<button className={styles.button}>РЕГИСТРАЦИЯ</button>
			</Link>
		</>
	);
};
