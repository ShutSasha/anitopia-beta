import { FC, useContext } from "react";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { Context } from "../../../main";

export const UserPersonalInfo: FC = () => {
	const { store } = useContext(Context);
	const renderUserDataItem = (
		dataUser: React.ReactNode | string,
		label: string
	) => (
		<li className={styles.user_data_item}>
			{label}
			{dataUser ? <span>{dataUser}</span> : <span>Не указано</span>}
		</li>
	);

	return (
		<div className={styles.container_user_data}>
			<ul className={styles.user_data_list}>
				{renderUserDataItem(
					format(store.user.registrationDate, "dd-MM-yyyy") ||
						"Не указано",
					"Дата регистрации: "
				)}
				{renderUserDataItem(store.user.firstName, "Имя: ")}
				{renderUserDataItem(store.user.lastName, "Фамилия: ")}
			</ul>
			<ul className={styles.user_data_list}>
				{renderUserDataItem(store.user.country, "Страна: ")}
				{renderUserDataItem(store.user.sex, "Пол: ")}
				{renderUserDataItem(store.user.age, "Возраст: ")}
			</ul>
		</div>
	);
};
