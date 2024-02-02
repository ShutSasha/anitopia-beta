import {FC, ReactElement} from "react";
import  styles from "./styles.module.scss"

interface ModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    children : ReactElement[];
}

export const Modal: FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div className={active ? `${[styles.modal,styles.modal_active].join(" ")}` : `${styles.modal}`} onClick={() => setActive(false)}>
            <div className={active ? `${[styles.modal_content, styles.modal_content_active].join(" ")}` : `${styles.modal_content}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
