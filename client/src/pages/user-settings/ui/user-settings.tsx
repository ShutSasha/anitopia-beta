import { ContentContainer, Footer, Header, SelectUserFrame, UserSettingsHeader, Wrapper } from '@widgets/index'
import { UserSettingsAccount } from '@widgets/user-settings-account'
import { FC } from 'react'

export const UserSettings: FC = () => {
   return (
      <Wrapper>
         <Header />
         <UserSettingsHeader />
         <ContentContainer padding='30px' backgroundColor='#fff' borderBottom='5px solid #ff6666'>
            <UserSettingsAccount />
         </ContentContainer>
         <ContentContainer padding='30px' backgroundColor='#fff'>
            <SelectUserFrame />
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
}
