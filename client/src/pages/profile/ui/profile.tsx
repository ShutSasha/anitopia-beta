import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
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

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (img) {
			const formData = new FormData();
			formData.append("img", img);

			$api
				.post(`/profile/uploadAvatar`, formData)
				.then(() => console.log("Картинка успешно загружена"))
				.catch((err) => console.error(err));
		}
	};

	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!store.isAuth) {
		navigate("/login");
		return <NotFoundPage />;
	}

	// const handleClick = () => {
	// 	const input = document.createElement("input");
	// 	input.type = "file";
	// 	input.accept = "image/*";

	// 	input.addEventListener("change", (event: any) => {
	// 		if (event && event.target) {
	// 			const file = event.target.files[0];
	// 			$api
	// 				.post(`/profile/uploadAvatar`, file)
	// 				.then(() => console.log("Картинка успешно загружена"))
	// 				.catch((err) => console.error(err));
	// 		}
	// 	});

	// 	input.click();
	// };

	if (store.isAuth) {
		return (
			<div>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.container}>
					<div className={styles.profile_bg_img}>
						<ProfileBgImg />
					</div>
					<div className={styles.profile_wrapper}>
						<div className={styles.main_user_info}>
							<div
								className={styles.imageContainer}
								// onClick={handleClick}
							>
								<img
									className={styles.profile_avatar_img}
									src={store.user.avatarLink}
									alt="Avatar"
								/>
								<span className={styles.uploadText}>Загрузить</span>
							</div>
							<h2>{store.user.username}</h2>
						</div>

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
