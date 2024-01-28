import { FC } from "react";
import styles from "./styles.module.scss";
import { Navbar } from "../../../features";
import { RegistrationButtons } from "../../../entities";

export const Header: FC = () => {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.container_header}>
					<Navbar />
					<RegistrationButtons />
				</div>
			</div>
		</>
	);
};
