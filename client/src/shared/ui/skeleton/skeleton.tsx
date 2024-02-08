import { FC } from "react";
import ContentLoader from "react-content-loader"

export const Skeleton: FC = (props) => (
	<ContentLoader
		speed={2}
		width={400}
		height={150}
		viewBox="0 0 400 150"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="40" y="16" rx="0" ry="0" width="150" height="250" />
	</ContentLoader>
)