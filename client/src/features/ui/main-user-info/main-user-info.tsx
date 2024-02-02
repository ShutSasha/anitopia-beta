import { useContext } from "react";
import styles from "./styles.module.scss";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";

interface MainUserInfoProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainUserInfo: React.FC<MainUserInfoProps> = observer(
	({ handleClick, fileInputRef, handleImageChange }) => {
		const { store } = useContext(Context);

		return (
			<>
				<div className={styles.main_user_info}>
					<div className={styles.imageContainer} onClick={handleClick}>
						<img
							className={styles.profile_avatar_img}
							src={store.user.avatarLink}
							alt="Avatar"
						/>
						<span className={styles.uploadText}>Загрузить</span>
						<input
							ref={fileInputRef}
							name="img"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							style={{ display: "none" }}
						/>
					</div>
					<h2 className={styles.title_username}>{store.user.username}</h2>
				</div>
				<div className={styles.container_user_data}>
					<ul className={styles.user_data_list}>
						<li className={styles.user_data_item}>
							Дата регистрации:
							{store.user.registrationDate ? (
								<div>
									{format(store.user.registrationDate, "dd-MM-yyyy")}
								</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
						<li className={styles.user_data_item}>
							Имя:
							{!store.user.username ? (
								<div>Аниме</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
						<li className={styles.user_data_item}>
							Фамилия:
							{!store.user.username ? (
								<div>Аниме</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
					</ul>
					<ul className={styles.user_data_list}>
						<li className={styles.user_data_item}>
							Страна:
							{!store.user.username ? (
								<div>Аниме</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
						<li className={styles.user_data_item}>
							Пол:
							{!store.user.username ? (
								<div>Аниме</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
						<li className={styles.user_data_item}>
							Возраст:
							{!store.user.username ? (
								<div>Аниме</div>
							) : (
								<span> Не указано</span>
							)}
						</li>
					</ul>
				</div>
			</>
		);
	}
);
