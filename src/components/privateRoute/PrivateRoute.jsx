import useAuthStatus from '../customHooks/useAuthStatus'
import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import LoadingSpinner from '../../outils/Spinner'
const PrivateRoute = () => {
    //const isLogged=!!(getAuth().currentUser)
    const {isChecking,isLogged}=useAuthStatus()
    if(isChecking) return <LoadingSpinner />
  return (
    <div>
      {
        isLogged ? <Outlet /> : <Navigate to="/signIn" />
      }
    </div>
  )
}

export default PrivateRoute
