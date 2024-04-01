import axios from 'axios'
import { TokenResponse } from '@react-oauth/google'

export const getUserData = async (googleResponse: TokenResponse) => {
   try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
         headers: {
            Authorization: `Bearer ${googleResponse.access_token}`,
         },
      })
      return response.data
   } catch (error) {
      console.error(error)
      throw error
   }
}
