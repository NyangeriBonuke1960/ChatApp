import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const access_token = useSelector((state) => state.auth.access_token)

    if(access_token){
        return <Outlet />
    }
    else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes