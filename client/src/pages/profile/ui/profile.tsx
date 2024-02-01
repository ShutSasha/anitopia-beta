import { FC, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
import $api from "../../../app/http";
import { Loader } from "../../../shared";

export const Profile: FC = observer(() => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const [img, setImage] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedImage = event.target.files[0];
			setImage(selectedImage);
			//! null?? what
			console.log(img);
		}
	};

	useEffect(() => {
		let intervalId: any;

		const checkUploadStatus = async () => {
			try {
				const response = await $api.get(
					`/profile/uploadStatus/${store.user.username}`
				);
				const status = response.data.status;
				console.log(status);
				if (status === false) {
					console.log("Image upload completed");
					clearInterval(intervalId);

					window.addEventListener("unload", function () {
						store.isLoading = false;
					});
					window.location.reload();
				} else if (!status) {
					console.error("Image upload failed");
					clearInterval(intervalId);
					store.isLoading = false;
				}
			} catch (error) {
				console.error("Error checking upload status", error);
			}
		};

		if (img) {
			store.isLoading = true;
			const formData = new FormData();
			formData.append("img", img);
			formData.append("username", store.user.username);

			$api
				.post("/profile/uploadAvatar", formData)
				.then(() => {
					console.log("Загрузка изображения началась");
					intervalId = setInterval(checkUploadStatus, 1000);
				})
				.catch((err) => {
					console.error("Error uploading image", err);
					store.isLoading = false;
				});
		}

		return () => clearInterval(intervalId);
	}, [img]);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	if (store.isLoading) {
		return <Loader />;
	}

	if (!store.isAuth) {
		navigate("/login");
		return <NotFoundPage />;
	}

	if (store.isAuth) {
		return (
			<div>
				<Header />
				<div className={styles.container}>
					<ProfileBgImg />
					<div className={styles.profile_wrapper}>
						<div className={styles.main_user_info}>
							<div
								className={styles.imageContainer}
								onClick={handleClick}
							>
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
							<h2 className={styles.title_username}>
								{store.user.username}
							</h2>
						</div>
						{/*  */}
						{/*  */}
						<div className={styles.contaienr_user_data}>
							<ul>
								<li>Дата регистрации:</li>
								<li>Имя:</li>
								<li>Фамилия:</li>
							</ul>
							<ul>
								<li>Страна:</li>
								<li>Пол:</li>
								<li>Возраст:</li>
							</ul>
						</div>
						{/*  */}
						{/*  */}
					</div>
				</div>
			</div>
		);
	}
});
