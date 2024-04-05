import { ContentContainer, Footer, Header, SelectUserFrame, UserSettingsHeader, Wrapper } from '@widgets/index'
import { UserSettingsAccount } from '@widgets/user-settings-account'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'

export const UserSettings: FC = observer(() => {
   const { store } = useContext(Context)

   return (
      <Wrapper>
         <Header />
         <UserSettingsHeader />
         <ContentContainer padding='30px' backgroundColor='#fff' borderBottom='5px solid #ff6666'>
            {true && <UserSettingsAccount />}
         </ContentContainer>
         <ContentContainer padding='30px' backgroundColor='#fff'>
            <SelectUserFrame />
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
