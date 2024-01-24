import { FC } from "react";
import notFoundImg from "./assets/404.png";

export const NotFoundPage: FC = () => {
	return <img src={notFoundImg} alt="404 not found" />;
};
