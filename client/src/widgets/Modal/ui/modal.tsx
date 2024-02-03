import {FC, ReactElement} from "react";
import styles from "./styles.module.scss";

interface ModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    children: ReactElement;
    headerText: string;
}

export const Modal: FC<ModalProps> = ({active, setActive, children, headerText}) => {
    const modalActive = active ? `${styles.modal} ${styles.modal_active}` : `${styles.modal}`;
    const contentModalActive = active ? `${styles.modal_content} ${styles.modal_content_active}` : `${styles.modal_content}`;

    return (
        <div className={modalActive} onClick={() => setActive(false)}>
            <div className={contentModalActive} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <p className={styles.header_text}>{headerText}</p>
                </div>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </div>
    );
};
