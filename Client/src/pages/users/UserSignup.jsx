import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../../context/userContext'

const UserSignup = () => {

    const clearForm = () => {

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, newUser);
            if (response.status === 201) {
                setUser(response.data.newUser)
                clearForm()
                localStorage.setItem('token', response.data.token)
                navigate('/user-home')
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
                    <h3 className='text-xl mb-2 font-bold'>Whats your Name</h3>
                    <div className='flex gap-4 mb-5'>

                        <input  autoComplete="off" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='First Name' name="firstName" id="firstName" required />

                        <input  autoComplete="off" onChange={(e) => { setLastName(e.target.value) }} value={lastName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Last Name' name="lastName" id="lastName" required />

                    </div>

                    <h3 className='text-xl mb-2 font-bold'>Whats Your email</h3>
                    <input onChange={(e) => { setEmail(e.target.value) }}  autoComplete="new-email" value={email} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='email@example.com' name="email" id="email" required />

                    <h3 className='text-xl mb-2 font-bold'>Password</h3>
                    <input placeholder='Password'  autoComplete="new-password" onChange={(e) => { setPassword(e.target.value) }} value={password} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="password" name="password" id="password" />

                    <button type='submit' className='w-full text-2xl font-bold mb-5 bg-[#111] text-white rounded px-4 py-2 text-lg placeholder:text-base'>Sign up</button>

                    <p className='text-center text-lg'>Already Have Account ?  go to <Link to='/user-login' className='text-blue-600'>Login</Link> </p>
                </form>
            </div>
            <div>
                <p>Click to visit <span className='text-blue-600 underline'>privacy and policy</span> of the application and here are the <span className='text-blue-600 underline'>Terms and conditions</span> of the application</p>
            </div>

        </div>
    )
}

export default UserSignup