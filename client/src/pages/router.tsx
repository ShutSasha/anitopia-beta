import { createBrowserRouter } from 'react-router-dom'
import { routes } from '../app/routes/consts'
import { NotFoundPage } from './not-found'
import { HomePage } from './home'
import { Registration } from './registration'
import { Login } from './login'
import { Profile } from './profile'
import { AnimeList } from './anime-list'
import { AnimePage } from './anime-page'
import { TopAnime } from './top-anime'
import { UserPolicy } from './user-policy'
import { Notifications } from './notifications'
import { UserSettings } from './user-settings'

export const router = createBrowserRouter(
   [
      {
         path: routes.HOME,
         element: <HomePage />,
      },
      {
         path: routes.REGISTRATION,
         element: <Registration />,
      },
      {
         path: routes.LOGIN,
         element: <Login />,
      },
      {
         path: routes.PROFILE,
         element: <Profile />,
      },
      {
         path: routes.ANIME_PAGE,
         element: <AnimePage />,
      },
      {
         path: routes.ANIME_LIST,
         element: <AnimeList />,
      },
      {
         path: routes.TOP_ANIME,
         element: <TopAnime />,
      },
      {
         path: routes.USER_POLICY,
         element: <UserPolicy />,
      },
      {
         path: routes.NOTIFICATIONS,
         element: <Notifications />,
      },
      {
         path: routes.USER_SETTINGS_ACCOUNT,
         element: <UserSettings />,
      },
      {
         path: routes.USER_SETTINGS_SITE,
         element: <UserSettings />,
      },
      {
         path: routes.USER_SETTINGS_SECURITY,
         element: <UserSettings />,
      },
      {
         path: routes.USER_SETTINGS_PREMIUM,
         element: <UserSettings />,
      },
      {
         path: '*',
         element: <NotFoundPage />,
      },
   ].map((route) => ({
      ...route,
      ErrorBoundary: NotFoundPage,
   })),
)
