import { FC } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";

export const HomePage: FC = () => {
	return (
		<>
			<Header />
			<div className={styles_h.wrapper}>
				<div className={styles_h.container}>
					<div className="someBlock"></div>
				</div>
			</div>
		</>
	);
};
