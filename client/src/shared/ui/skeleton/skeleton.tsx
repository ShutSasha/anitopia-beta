import { FC } from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: FC = (props) => (
	<ContentLoader
		speed={2}
		width={150}
		height={250}
		viewBox="0 0 150 250"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="0" rx="0" ry="0" width="150" height="250" />
	</ContentLoader>
);
