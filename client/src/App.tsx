import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router'
import { useStore } from '@app/hooks/useStore'


const NoticeContainer: FC = () => {
   return <div className='notice-container'></div>
}

export const App: FC = () => {
   const { store } = useStore()

   useEffect(() => {
      if (localStorage.getItem('token')) {
         store.checkAuth()
      }
   }, [])

   return (
      <>
         <NoticeContainer />
         <RouterProvider router={router} />
      </>
   )
}
