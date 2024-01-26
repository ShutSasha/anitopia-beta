import { FC } from "react";
import styles from "./styles.module.scss";
import { Navbar } from "../../../features";

export const Header: FC = () => {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.container_header}>
					<Navbar></Navbar>
					{/* buttons */}
				</div>
			</div>
		</>
	);
};
