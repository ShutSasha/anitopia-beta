import {FC,CSSProperties} from "react";
import styles from "./styles.module.scss"
interface ButtonProps{
    text:string;
    padding:string;
    color:string;
    backgroundColor:string;
    onClick: () => Promise<void>;
}

export const DefaultButton: FC<ButtonProps> = ({text,padding,color,backgroundColor,onClick}) => {

    const buttonStyles: CSSProperties = {
        padding: padding || "10px",
        background: backgroundColor || "#ff6666",
        color: color || "white"
    }

    return (
        <>
         <button className={styles.default_btn} style={buttonStyles} onClick={onClick}>
             {text}
         </button>
        </>
    );
};