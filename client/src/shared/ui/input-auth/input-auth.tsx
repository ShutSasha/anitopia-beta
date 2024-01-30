import { FC } from "react";
import styles from "./styles.module.scss";

interface InputAuthProps {
	img: any;
	setValue: (item: any) => void;
	htmlFor: string;
	type: string;
	textLabel: string;
}

export const InputAuth: FC<InputAuthProps> = ({
	img,
	setValue,
	htmlFor,
	type,
	textLabel,
}) => {
	return (
		<>
			<div className={styles.input_box}>
				<span className={styles.icon}>
					<img src={img} alt="" />
				</span>
				<input
					onChange={(e) => setValue(e.target.value)}
					id={htmlFor}
					type={type}
					required
				/>
				<label htmlFor={htmlFor}>{textLabel}</label>
			</div>
		</>
	);
};
