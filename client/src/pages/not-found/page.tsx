import {FC} from "react";
import notFoundImg from "./assets/404.png";
import styles from "./style.module.scss"
import {ButtonReturn} from "../../shared";
import {Link} from "react-router-dom";

export const NotFoundPage: FC = () => {
    return (
        <div className={styles.container}>
            <img src={notFoundImg} className={styles.img} alt="404 not found"/>
            <p className={styles.text}>Error 404. Page not found</p>
            <Link to="/">
                <ButtonReturn/>
            </Link>
        </div>

    )

};
