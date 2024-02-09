import { FC } from "react";
import styles from "./styles.module.scss";

export const SearchInput: FC = () => {
	return (
		<>
			<input
				type="text"
				className={styles.input}
				placeholder={"НАЙТИ АНИМЕ"}
			/>
		</>
	);
};
