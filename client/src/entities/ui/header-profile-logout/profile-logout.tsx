import { FC } from "react";
import { User } from "../../../shared";
import { Logout } from "../../../shared";
import styles from './styles.module.scss'

export const ProfileLogout: FC = () => {
	return (
		<div className={styles.user_logout_wrapper}>
			<User />
			<Logout />
		</div>
	);
};
