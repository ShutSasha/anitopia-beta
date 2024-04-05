import { FC } from 'react'
import styles from './styles.module.scss'

interface Props {}

export const AboutMeField: FC<Props> = () => {
   const handleChange = () => {}
   return <span contentEditable='true' className={styles.input} onInput={handleChange} />
}
