import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
import axios from "axios";
import $api from "../../../app/http";

export const Profile: FC = observer(() => {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const [img, setImage] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedImage = event.target.files[0];
			setImage(selectedImage);
		}
	};

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (img) {
			// Создаем объект FormData и добавляем файл
			const formData = new FormData();
			formData.append("img", img);

			try {
				// Отправляем POST-запрос с использованием fetch или другой библиотеки
				const response = await fetch(
					`http://localhost:5000/api/profile/uploadAvatar`,
					{
						method: "POST",
						body: formData,
					}
				);

				// Обрабатываем ответ
				if (response.ok) {
					console.log("Картинка успешно загружена");
				} else {
					console.error("Ошибка при загрузке картинки");
				}
			} catch (error) {
				console.error("Произошла ошибка", error);
			}
		}
	};

	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!store.isAuth) {
		navigate("/login");
		return <NotFoundPage />;
	}

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
						<form onSubmit={handleFormSubmit}>
							<label htmlFor="imageUpload">
								Выберите изображение для загрузки:
							</label>
							<input
								name="img"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
							<input
								style={{ cursor: "pointer" }}
								type="submit"
								value="Загрузить"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
});
