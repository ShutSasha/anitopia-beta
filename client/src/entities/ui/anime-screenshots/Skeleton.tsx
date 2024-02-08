import { FC } from "react";
import ContentLoader from "react-content-loader";

export const SkeletonPoster: FC = () => (
	<ContentLoader
		speed={2}
		width={640}
		height={360}
		viewBox="0 0 640 360"
		backgroundColor="#e6e6e6"
		foregroundColor="#ffffff"
	>
		<rect x="0" y="-1" rx="0" ry="0" width="640" height="360" />
	</ContentLoader>
);
