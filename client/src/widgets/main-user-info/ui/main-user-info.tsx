import { FC } from "react";
import { AvatarUsernameProfile, UserPersonalInfo } from "../../../features";

export interface MainUserInfoProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainUserInfo: FC<MainUserInfoProps> = ({
	handleClick,
	fileInputRef,
	handleImageChange,
}) => {
	return (
		<>
			<AvatarUsernameProfile
				handleClick={handleClick}
				fileInputRef={fileInputRef}
				handleImageChange={handleImageChange}
			/>
			<UserPersonalInfo />
		</>
	);
};
