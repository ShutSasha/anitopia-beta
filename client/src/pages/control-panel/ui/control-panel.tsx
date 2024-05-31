import { ContentContainer, ControlPanelHeader, Footer, Header, Wrapper } from '@widgets/index'
import { FC } from 'react'
import { CONTROL_PANEL_PAGES } from '../consts/control-panel-pages'

export const ControlPanel: FC = () => {
   const pathURL = window.location.pathname.split('/').pop()

   return (
      <Wrapper>
         <Header />
         <ContentContainer style={{ marginTop: '40px', marginBottom: '25px' }}>
            <ControlPanelHeader style={{ backgroundColor: '#343A40', borderRadius: '10px' }} />
         </ContentContainer>
         <ContentContainer style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
            {CONTROL_PANEL_PAGES.map((item) => item.page === pathURL && item.component)}
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
}
