import { FC, useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const Logout: FC = observer(() => {
	const { store } = useContext(Context);
	return (
		<div>
			<button className={styles.btn} onClick={() => store.logout()}></button>
		</div>
	);
});
