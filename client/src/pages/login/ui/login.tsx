import { FC, useContext } from "react";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { useState } from "react";
import { InputAuth } from "../../../shared";
import { AuthContext } from "../context/AuthContext";
import { getInputsData } from "../consts/input-data";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

export const Login: FC = observer(() => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { store } = useContext(Context);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log({ username, password });
		store.login(username, password);
	};

	const inputsData = getInputsData(setUsername, setPassword);
	return (
		<AuthContext.Provider value={{ setUsername, setPassword }}>
			<div className={styles.registration_wrapper}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<div className={styles.form_box}>
							<h2>Вход</h2>
							<form onSubmit={handleSubmit}>
								{inputsData.map((item, index) => (
									<InputAuth
										key={index}
										img={item.img}
										setValue={item.setValue}
										htmlFor={item.htmlFor}
										type={item.type}
										textLabel={item.textLabel}
									/>
								))}
								<input
									type="submit"
									value="Войти"
									className={styles.registration_btn}
								></input>
							</form>
						</div>
					</div>
				</div>
			</div>
		</AuthContext.Provider>
	);
});
