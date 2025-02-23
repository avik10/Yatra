import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const cleaformData = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }
    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({ fullname: { firstname: firstName, lastname: lastName }, email: email, password: password })

        // api call
        // console.log(captainData);

        cleaformData()
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img src='https://i.pinimg.com/736x/db/67/55/db67557e8d75747aaaa4c9c6a0ec909c.jpg' alt="Logo" className='h-25 w-25 p-5' />
                <form onSubmit={submitHandler}>
                    <h3 className='text-xl mb-2 font-bold'>Whats Captain Name</h3>
                    <div className='flex gap-4 mb-5'>

                        <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='First Name' name="firstName" id="firstName" required />

                        <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Last Name' name="lastName" id="lastName" required />

                    </div>

                    <h3 className='text-xl mb-2 font-bold'>Whats Captain email</h3>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='email@example.com' name="email" id="email" required />

                    <h3 className='text-xl mb-2 font-bold'>Password</h3>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' placeholder='Password' type="password" name="password" id="password" />

                    <button type='submit' className='w-full text-2xl font-bold mb-5 bg-[yellow] text-black rounded px-4 py-2 text-lg '>Sign up</button>

                    <p className='text-center text-lg'>Already Have Account ?  go to <Link to='/captain-login' className='text-blue-600'>Login</Link> </p>
                </form>
            </div>
            <div>
                <p>Click to visit <span className='text-blue-600 underline'>privacy and policy</span> of the application and here are the <span className='text-blue-600 underline'>Terms and conditions</span> of the application</p>
            </div>

        </div>
    )
}

export default CaptainSignup