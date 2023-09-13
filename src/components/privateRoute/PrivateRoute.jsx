import useAuthStatus from '../customHooks/useAuthStatus'
import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
const PrivateRoute = () => {
    //const isLogged=!!(getAuth().currentUser)
    const {isChecking,isLogged}=useAuthStatus()
    if(isChecking) return <h3>is loading</h3>
  return (
    <div>
      {
        isLogged ? <Outlet /> : <Navigate to="/signIn" />
      }
    </div>
  )
}

export default PrivateRoute
