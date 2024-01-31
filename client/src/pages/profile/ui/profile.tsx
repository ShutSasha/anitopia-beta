import { FC, useContext, useEffect } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";

export const Profile: FC = observer(() => {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}

	useEffect(() => {
		if (!store.isAuth) {
			navigate("/login");
		}
	}, [store.isAuth]);

	if (store.isAuth) {
		return (
			<div>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.container}>
					<div className={styles.profile_img}>
						<ProfileBgImg />
					</div>
					<div className={styles.profile_wrapper}>
						<h2>Hello {store.user.username}</h2>
					</div>
				</div>
			</div>
		);
	}
});
