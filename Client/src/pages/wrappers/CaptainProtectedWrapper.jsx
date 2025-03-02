import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../../context/CaptainContext'

const CaptainProtectedWrapper = ({ children }) => {

    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
    }, [])

    try {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setTimeout(() => {
                    setIsLoading(false)    
                }, 3000);
                setCaptain(response.data.captain)
                
            }
        }).catch(err => {
            localStorage.clear()
            navigate('/captain-login')
        })

    } catch (error) {
        console.error("verify failed:", error)
    }



    // check validCaptain


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>{children}</>
    )
}

export default CaptainProtectedWrapper