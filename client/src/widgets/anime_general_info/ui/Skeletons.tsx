import { FC } from "react";
import ContentLoader from "react-content-loader";

export const SkeletonPoster: FC = () => (
	<ContentLoader
		speed={2}
		width={250}
		height={350}
		viewBox="0 0 250 350"
		backgroundColor="#e6e6e6"
		foregroundColor="#ffffff"
	>
		<rect x="0" y="-1" rx="0" ry="0" width="250" height="350" />
	</ContentLoader>
);
