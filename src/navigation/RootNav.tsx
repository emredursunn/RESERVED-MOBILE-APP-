import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStackNav from './AuthStackNav'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AdminStackNav from './AdminStackNav'
import UserStackNav from './UserHomeStackNav'
import UserTabNav from './UserTabNav'

const RootNav = () => {

  const isAuth = useSelector((state: RootState) => state.token.token)
  const role = useSelector((state: RootState) => state.token.role)
  return (
    <NavigationContainer>
      {isAuth ?
        //<AdminStackNav /> FOR ADMIN SIDE
        //<UserTabNav /> FOR USER SIDE
        (
          role ?
            <AdminStackNav />
            :
            <UserTabNav />
        )
        :
        <AuthStackNav />
      }
    </NavigationContainer>
  )
}

export default RootNav