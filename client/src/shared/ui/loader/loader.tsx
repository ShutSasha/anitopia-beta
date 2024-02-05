import { FC } from "react";
import cl from "./style.module.scss";

export const Loader: FC = () => {
	return (
		<div className={cl.container_loader}>
			<div className={cl.loader}></div>
		</div>
	);
};
