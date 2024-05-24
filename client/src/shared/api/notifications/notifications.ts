import $api from '@app/http'
import { Notification } from './models'
import { AxiosPromise } from 'axios'

const BASE_URL = '/notifications'

export const getNotificationsByUserid = ({ id }: { id: string }): AxiosPromise<Notification[]> => {
   return $api.get(`${BASE_URL}/user/${id}`)
}

export const deleteNotification = ({ id }: { id: string }): AxiosPromise<{ message: 'success' }> => {
   return $api.delete(`${BASE_URL}/${id}`)
}

export const deleteAllNotifications = ({ id }: { id: string }): AxiosPromise<{ message: 'success' }> => {
   return $api.delete(`${BASE_URL}/user/${id}`)
}