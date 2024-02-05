import React, { useState, useEffect } from "react";
import styles from "./Toast.module.scss";

interface ToastProps {
	message: string;
	duration?: number;
	onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
	message,
	duration = 3000,
	onClose,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div
			className={`${styles.toast} ${isVisible ? styles.show : styles.hide}`}
		>
			<p>{message}</p>
		</div>
	);
};
