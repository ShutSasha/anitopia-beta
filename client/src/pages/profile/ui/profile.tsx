import { FC, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { MainUserInfo, ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
import { Loader } from "../../../shared";
import { uploadImage } from "../api/uploadImage";
import { checkUploadStatus } from "../helpers/checkUploadStatus";

export const Profile: FC = observer(() => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const [img, setImage] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedImage = event.target.files[0];
			setImage(selectedImage);
		}
	};

	useEffect(() => {
		let intervalId: any;

		if (img) {
			store.isLoading = true;

			try {
				intervalId = uploadImage(img, store.user.username, () =>
					checkUploadStatus(
						store.user.username,
						intervalId,
						store.isLoading
					)
				);
			} catch (error) {
				clearInterval(intervalId);
				store.isLoading = false;
			}
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
						<MainUserInfo
							handleClick={handleClick}
							fileInputRef={fileInputRef}
							handleImageChange={handleImageChange}
						/>
					</div>
				</div>
			</div>
		);
	}
});
