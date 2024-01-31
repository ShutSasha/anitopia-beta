import { FC, useContext, useState } from "react";
import styles_h from "./styles.module.scss";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { IUser } from "../../../app/models/IUser";
import UserService from "../../../app/services/UserService";

export const HomePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [users, setusers] = useState<IUser[]>([]);
	async function getUsers() {
		try {
			const response = await UserService.fetchUsers();
			setusers(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<>
			<Header />
			<div className={styles_h.wrapper}>
				<div className={styles_h.container}>
					<div className="someBlock">
						<h2>
							{!store.isAuth ? (
								<div>aboba</div>
							) : (
								<div>
									Вы вошли как {store.user.username}
									<button onClick={() => store.logout()}>
										logout
									</button>
									<div>
										<button onClick={getUsers}>get users</button>
										{users.map((user) => (
											<div key={user.id}>{user.username}</div>
										))}
									</div>
								</div>
							)}
						</h2>
					</div>
				</div>
			</div>
		</>
	);
});
