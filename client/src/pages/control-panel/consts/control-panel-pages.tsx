import { ControlPanelBans, ControlPanelRequestAnime, ControlPanelRoles } from '@widgets/index'

export const CONTROL_PANEL_PAGES = [
   { page: 'bans', component: <ControlPanelBans key={'bans'} /> },
   { page: 'requests-anime', component: <ControlPanelRequestAnime key={'requests-anime'} /> },
   { page: 'roles', component: <ControlPanelRoles key={'roles'} /> },
]
