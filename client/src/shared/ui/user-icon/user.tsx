import { FC, useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const User: FC = observer(() => {
	const { store } = useContext(Context);

	return (
		<>
			<div>
				<Link title="Профиль" to="/profile">
					<img
						className={styles.profile_img}
						src={store.user.avatarLink}
						alt="Profile"
					/>
				</Link>
			</div>
		</>
	);
});
