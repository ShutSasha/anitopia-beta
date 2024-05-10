import { ContentContainer, Footer, Header, UserSettingsHeader, Wrapper } from '@widgets/index'
import { FC } from 'react'
import { SETTINGS_PAGES } from '../consts/settings-pages'

export const UserSettings: FC = () => {
   const pathURL = window.location.pathname.split('/').pop()

   if (!pathURL) {
      return <div>404</div>
   }

   return (
      <Wrapper>
         <Header />
         <UserSettingsHeader pathURL={pathURL} />
         {SETTINGS_PAGES.map((item) => item.page === pathURL && item.component)}
         <Footer />
      </Wrapper>
   )
}
