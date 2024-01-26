import { FC } from "react";
import { ButtonLogIn } from "../../../shared";
import { ButtonSignUp } from "../../../shared";
import styles from "./styles.module.scss";

export const RegistrationButtons: FC = () => {
	return (
		<div className={styles.buttons}>
			<ButtonLogIn></ButtonLogIn>
			<ButtonSignUp></ButtonSignUp>
		</div>
	);
};
