import { FC } from 'react'
import styles from './styles.module.scss'
import { ContentContainer } from '@widgets/content-container'
import { CheckBox } from '@features'
import { SITE_THEMES } from '../consts/site-themes'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const UserSettingsSite: FC = () => {
   const { store } = useStore()

   return (
      <>
         <ContentContainer style={{ padding: '30px', backgroundColor: '#fff', borderBottom: '5px solid #ff6666' }}>
            <h2 className={styles.title}>Зміна теми сайту</h2>
            <div className={styles.change_theme_site_container}>
               <div className={styles.current_theme}></div>
               <div className={styles.arrow}></div>
               <div className={styles.change_theme_exist}>
                  {SITE_THEMES.map((item, index) => (
                     <div
                        onClick={() => store.setSiteBackground(item.color)}
                        key={index}
                        style={
                           item.isUpload
                              ? { backgroundImage: `url(${item.color})` }
                              : { backgroundColor: `${item.color}` }
                        }
                        className={styles.change_theme_item}
                     ></div>
                  ))}
               </div>
            </div>
         </ContentContainer>
         <ContentContainer
            style={{
               padding: '30px',
               backgroundColor: '#fff',
               borderBottomLeftRadius: '10px',
               borderBottomRightRadius: '10px',
               marginBottom: '30px',
            }}
         >
            <CheckBox style={{ marginBottom: '40px' }} text='Відображення рейтингу аніме' />
            <CheckBox style={{ marginBottom: '40px' }} text='Автоматичне відтворення серії ' />
            <CheckBox style={{ marginBottom: '40px' }} text='Відображати каталог за персональними вподобанням' />
         </ContentContainer>
      </>
   )
}
