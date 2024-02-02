import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import styles from "./styles.module.scss";
import { Context } from "../../../main";

interface MainUserInfoProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AvatarUsernameProfile: FC<MainUserInfoProps> = observer(
	({ handleClick, fileInputRef, handleImageChange }) => {
		const { store } = useContext(Context);
		return (
			<div className={styles.avatar_and_username}>
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
		);
	}
);
