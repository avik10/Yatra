import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CaptainLogout = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                localStorage.clear()
                navigate('/captain-login')
            }

        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div>
            <button className='p-5 text-xl text-white font-bold bg-red-500' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default CaptainLogout