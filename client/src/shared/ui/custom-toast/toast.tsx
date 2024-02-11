import React, { useState, useEffect } from "react";
import styles from "./Toast.module.scss";
interface ToastProps {
	message: string;
	duration?: number;
	isError?: boolean;
	onClose: () => void;
	clearIsError: () => void;
}

export const Toast: React.FC<ToastProps> = ({
	message,
	duration = 3000,
	isError = false,
	onClose,
	clearIsError
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			clearIsError()
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div
			className={`${styles.toast} ${isVisible ? styles.show : styles.hide}`}
		>
			<div>
				<div
					className={styles.caption}
					style={{
						borderBottom: isError
							? "2px solid #ff6666"
							: "2px solid #9954d8",
					}}
				>
					{isError ? (
						<>
							<span className={styles.exclamation_mark}>!</span> Ошибка
						</>
					) : (
						<>\_(シ)_/</>
					)}
				</div>
				<p className={styles.message}>{message}</p>
			</div>
		</div>
	);
};
