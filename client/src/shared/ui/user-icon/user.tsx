import { FC, useContext } from "react";
// import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import user_img_default from "./assets/profile-img-default.jpg";
import styles from "./styles.module.scss";

export const User: FC = observer(() => {
	// const { store } = useContext(Context);

	return (
		<>
			<div>
				<Link to="/profile">
					<img
						className={styles.profile_img}
						src={user_img_default}
						alt="Profile"
					/>
				</Link>
			</div>
		</>
	);
});
