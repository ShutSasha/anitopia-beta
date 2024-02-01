import { FC, useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const Logout: FC = observer(() => {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		store.logout();
		navigate("/login");
	};

	return (
		<div title="Выход">
			<button className={styles.btn} onClick={() => handleLogout()}></button>
		</div>
	);
});
