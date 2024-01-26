import {FC} from "react";
import styles from './styles.module.scss'

export const ButtonReturn: FC = () => {
    return (
        <>
                <button className={styles.return_btn}>return to home</button>
        </>
    );
};

