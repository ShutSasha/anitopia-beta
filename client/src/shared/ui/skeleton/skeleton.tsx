import { FC } from "react";
import ContentLoader from "react-content-loader"

export const Skeleton: FC = (props) => (
	<ContentLoader
		speed={2}
		width={250}
		height={150}
		viewBox="0 0 250 150"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="-1" rx="0" ry="0" width="250" height="150" />
	</ContentLoader>
)
