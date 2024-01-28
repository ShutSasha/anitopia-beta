import { FC } from "react";
import styles from "./styles.module.scss";
import { Header } from "../../../widgets/header";

export const HomePage: FC = () => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className="someBlock"></div>
			</div>
		</>
	);
};
