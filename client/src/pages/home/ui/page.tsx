import { FC, useContext } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);

	console.log(store.user);

	return (
		<>
			<Header />
			<div className={styles_h.wrapper}>
				<div className={styles_h.container}>
					<div className="someBlock">
						<h2>
							{store.isAuth
								? `Пользователь авторизован ${store.user.username}`
								: "АВТОРИЗУЙТЕСЬ"}
						</h2>
					</div>
				</div>
			</div>
		</>
	);
});
