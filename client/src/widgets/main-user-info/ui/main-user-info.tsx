import { FC } from "react";
import { AvatarUsernameProfile, UserPersonalInfo } from "../../../features";
import { observer } from "mobx-react-lite";
export interface MainUserInfoProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainUserInfo: FC<MainUserInfoProps> = observer(({
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
});
