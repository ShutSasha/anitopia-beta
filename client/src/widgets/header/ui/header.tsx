import { FC, useContext } from "react";
import styles from "./styles.module.scss";
import { Navbar } from "../../../features";
import { ProfileLogout, RegistrationButtons } from "../../../entities";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

export const Header: FC = observer(() => {
	const { store } = useContext(Context);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.container_header}>
					<Navbar />
					{store.isAuth ? <ProfileLogout /> : <RegistrationButtons />}
				</div>
			</div>
		</>
	);
});
