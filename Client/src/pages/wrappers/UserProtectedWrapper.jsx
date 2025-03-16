import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/UserContext'


const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
    }, [])

    try {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setIsLoading(false)
                setUser(response.data.User)

            }
        }).catch(err => {
            localStorage.clear()
            navigate('/captain-login')
        })

    } catch (error) {
        console.error("verify failed:", error)
    }

    return (
        <>{children}</>
    )
}

export default UserProtectedWrapper