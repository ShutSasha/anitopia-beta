import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
import axios from "axios";

export const Profile: FC = observer(() => {
	const [image, setImage] = useState<File | null>(null);
	const { store } = useContext(Context);
	const navigate = useNavigate();

	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.files && event.target.files.length > 0) {
	// 		setSelectedFile(event.target.files[0]);
	// 	} else {
	// 		setSelectedFile(null);
	// 	}
	// };

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (image == null) {
			return;
		}
		console.log(image);
		const formData = new FormData();
		// formData.append("img", selectedFile);
		formData.append("img", image);
		console.log(formData);

		axios
			.post(`http://localhost:5000/api/profile/upload-avatar`, formData)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
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
						<form onSubmit={handleSubmit}>
							<label htmlFor="imageUpload">
								Выберите изображение для загрузки:
							</label>
							<input
								type="file"
								onChange={(e) => {
									const selectedFile = e.target.files?.[0];
									if (selectedFile) {
										setImage(selectedFile);
									}
								}}
							/>
							<input
								style={{cursor: "pointer"}}
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
