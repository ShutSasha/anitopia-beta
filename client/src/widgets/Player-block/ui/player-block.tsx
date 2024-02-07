import { FC } from "react";

interface PlayerProps {
	link: string;
}

export const PlayerBlock: FC<PlayerProps> = ({ link }) => {
	return (
		<>
			<iframe
				src={link}
				width="610px"
				height="370px"
				allow="autoplay *; fullscreen *"
			></iframe>
		</>
	);
};
