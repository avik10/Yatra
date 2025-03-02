import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../../context/CaptainContext'

const CaptainLogin = () => {

    const clearForm = () => {
        setEmail('')
        setPassword('')
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)


    const submitHandler = async (e) => {
        e.preventDefault()

        const User = {

            email: email,
            password: password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, User);
            if (response.status === 200) {
                setCaptain(response.data.captain)
                clearForm()
                localStorage.setItem('token', response.data.token)
                navigate('/captain-home')
            }

        } catch (error) {
            console.error("Error:", error);
        }

    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img src='https://i.pinimg.com/736x/db/67/55/db67557e8d75747aaaa4c9c6a0ec909c.jpg' alt="Logo" className='h-25 w-25 p-5' />
                <form onSubmit={submitHandler}>

                    <h3 className='text-xl mb-2 font-bold'>Whats Captain email</h3>
                    <input onChange={(e) => { setEmail(e.target.value) }} autoComplete="current-email" value={email} className='w-full mb-7 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='email@example.com' name="email" id="email" required />

                    <h3 className='text-xl mb-2 font-bold'>Password</h3>
                    <input placeholder='Password'  autoComplete="current-password" onChange={(e) => { setPassword(e.target.value) }} value={password} className='w-full mb-7 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="password" name="password" id="password" />

                    <button type='submit' className='w-full text-2xl font-bold mb-7  bg-[yellow] text-black rounded px-4 py-2 text-lg placeholder:text-base'>Captain Login</button>

                    <p className='text-center text-xl'>New here ? <Link to='/captain-signup' className='text-blue-600'>Create New Account</Link> </p>
                </form>
            </div>
            <div>
                <Link to='/user-login' className='flex justify-center w-full text-2xl font-bold  mb-7  bg-[#111] text-white rounded px-4 py-2 text-lg placeholder:text-base'>Go to User Login</Link>
            </div>

        </div>
    )
}


export default CaptainLogin