import { FC, useContext } from 'react'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

interface ItemData {
   type: string
   icon: string
   text: string
}

export const CollectionHeaderItem: FC<ItemData> = observer(
   ({ type, icon, text }) => {
      const { store } = useContext(Context)

      return (
         <li
            className={styles.collection_header_item}
            onClick={() =>
               store.userAnimeCollection.setCollectionType(`${type}`)
            }
            style={
               store.userAnimeCollection.collectionType === `${type}`
                  ? { backgroundColor: '#ff6666' }
                  : {}
            }
         >
            <img className={styles.collection_header_icon} src={icon} alt='' />
            <p>{text}</p>
         </li>
      )
   },
)
