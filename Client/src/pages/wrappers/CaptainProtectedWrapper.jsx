import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../../context/CaptainContext'

const CaptainProtectedWrapper = ({ children }) => {

    const { setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [])

    try {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
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

    return (
        <>{children}</>
    )
}

export default CaptainProtectedWrapper