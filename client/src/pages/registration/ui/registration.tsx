import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import userImg from "../assets/person.svg";
import emailImg from "../assets/mail.svg";
import passwordImg from "../assets/lock-closed.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Toast } from "../../../shared";
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

	return (
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
							<div className={styles.input_box}>
								<span className={styles.icon}>
									<img src={userImg} alt="" />
								</span>
								<input
									onChange={(e) => setUsername(e.target.value)}
									id="username"
									type="text"
									required
								/>
								<label htmlFor="username">Имя пользователя</label>
							</div>
							<div className={styles.input_box}>
								<span className={styles.icon}>
									<img src={emailImg} alt="" />
								</span>
								<input
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									type="email"
									required
								/>
								<label htmlFor="email">Почта</label>
							</div>
							<div className={styles.input_box}>
								<span className={styles.icon}>
									<img src={passwordImg} alt="" />
								</span>
								<input
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									type="password"
									required
								/>
								<label htmlFor="password">Пароль</label>
							</div>
							<div className={styles.input_box}>
								<span className={styles.icon}>
									<img src={passwordImg} alt="" />
								</span>
								<input
									onChange={(e) => setRepeatPassword(e.target.value)}
									id="repeat-password"
									type="password"
									required
								/>
								<label htmlFor="repeat-password">
									Подтверждение пароля
								</label>
							</div>
							<div className={styles.user_agreement}>
								<label>
									<input type="checkbox" />
									<div className={styles.checkbox_icon}></div>
									<p>
										Я согласен с{" "}
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
	);
};
