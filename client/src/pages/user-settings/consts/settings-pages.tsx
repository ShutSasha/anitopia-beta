import { UserSettingsPremium, UserSettingsSecurity, UserSettingsSite } from '@widgets/index'
import { UserSettingsAccount } from '@widgets/user-settings-account'

export const SETTINGS_PAGES = [
   { page: 'account', component: <UserSettingsAccount key={'account'} /> },
   { page: 'site', component: <UserSettingsSite key={'site'} /> },
   { page: 'security', component: <UserSettingsSecurity key={'security'} /> },
   { page: 'premium', component: <UserSettingsPremium key={'premium'} /> },
]
