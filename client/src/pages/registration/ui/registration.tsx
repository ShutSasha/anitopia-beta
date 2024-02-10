import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Loader, Toast } from "../../../shared";
import { InputAuth } from "../../../shared";
import { AuthContext } from "../context/AuthContenx";
import { getInputsData } from "../consts/input-data";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

export const Registration = observer(() => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [showToast, setShowToast] = useState(false);
	const { store } = useContext(Context);
	const navigate = useNavigate();

	if (store.isLoading) {
		return <Loader />;
	}

	const handleButtonClick = () => {
		store.setError("Пароли не совпадают!");
		setShowToast(true);
		store.setIsError(false);
		setTimeout(() => setShowToast(false), 15000);
		setTimeout(() => store.setIsError(false), 15000);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (repeatPassword !== password) {
			handleButtonClick();
			return;
		}

		store
			.registration(username, password, email)
			.then((isLoggedIn) => {
				if (isLoggedIn) {
					navigate("/");
				} else {
					setShowToast(true);
					store.setIsError(true);
					setTimeout(() => setShowToast(false), 15000);
					setTimeout(() => store.setIsError(false), 15000);
				}
			})
			.catch((err) => console.error(err));
	};

	const inputsData = getInputsData(
		setUsername,
		setEmail,
		setPassword,
		setRepeatPassword
	);

	return (
		<AuthContext.Provider
			value={{ setUsername, setEmail, setPassword, setRepeatPassword }}
		>
			{showToast && (
				<Toast
					message={store.messageError}
					duration={15000}
					isError={store.isError}
					onClose={() => setShowToast(false)}
				/>
			)}
			<div className={styles.registration_wrapper}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<div className={styles.form_box}>
							<h2>Регистрация</h2>
							<form onSubmit={handleSubmit}>
								{inputsData.map((item, index) => (
									<InputAuth
										labelColor={"white"}
										key={index}
										img={item.img}
										setValue={item.setValue}
										htmlFor={item.htmlFor}
										type={item.type}
										textLabel={item.textLabel}
									/>
								))}
								<div className={styles.user_agreement}>
									<label>
										<input type="checkbox" />
										<div className={styles.checkbox_icon}></div>
										<p>
											Я согласен с
											<Link
												className={styles.user_agreement_span}
												to="/terms-of-use"
											>
												пользовательським соглашением
											</Link>
										</p>
									</label>
								</div>
								<input
									type="submit"
									value="Зарегистрироваться"
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
