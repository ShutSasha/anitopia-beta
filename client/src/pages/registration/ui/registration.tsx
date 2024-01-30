import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { Toast } from "../../../shared";
import { InputAuth } from "../../../shared";
import { AuthContext } from "../context/AuthContenx";
import { getInputsData } from "../consts/input-data";

export const Registration = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handleButtonClick = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 4000);
	};

	const onCreate = (formData: any) => {
		//example
		// axios
		// 	.put("link", formData)
		// 	.then((res) => console.log("user created", res.data))
		// 	.catch((err) => console.error(err));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (repeatPassword !== password) {
			handleButtonClick();
			console.log(showToast);
			return;
		}

		const formData = {
			username: username,
			email: email,
			password: password,
		};
		console.log(formData);

		onCreate(formData);
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
			<div className={styles.registration_wrapper}>
				{showToast && (
					<Toast
						message="Пароли не совпадают!"
						duration={4000}
						onClose={() => setShowToast(false)}
					/>
				)}
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
};
