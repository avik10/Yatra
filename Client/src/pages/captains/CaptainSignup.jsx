import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../../context/CaptainContext'

const CaptainSignup = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')


    const { setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const cleaformData = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData =
        {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain`, captainData);
            if (response.status === 201) {
                setCaptain(response.data.newCaptain)
                cleaformData()
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
                    <h3 className='text-xl mb-2 font-bold'>Whats Captain Name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input onChange={(e) => { setFirstName(e.target.value) }} autoComplete="off" value={firstName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='First Name' name="firstName" id="firstName" required />

                        <input onChange={(e) => { setLastName(e.target.value) }} autoComplete="off" value={lastName} className='w-1/2  bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Last Name' name="lastName" id="lastName" required />
                    </div>
                    <h3 className='text-xl mb-2 font-bold'>Whats Captain email</h3>
                    <input onChange={(e) => { setEmail(e.target.value) }} autoComplete="new-email" value={email} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='email@example.com' name="email" id="email" required />

                    <h3 className='text-xl mb-2 font-bold'>Password</h3>
                    <input onChange={(e) => { setPassword(e.target.value) }} autoComplete="new-password" value={password} className='w-full mb-5 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' placeholder='Password' type="password" name="password" id="password" />

                    <h3 className='text-xl mb-2 font-bold'>Vehicle Information</h3>
                    <div className='flex flex-col gap-5 mb-5'>
                        <div className=" flex flex-row gap-4">
                            <input onChange={(e) => { setVehicleColor(e.target.value) }} value={vehicleColor} className='w-full bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Vehicle Color' name="vehicleColor" id="vehicleColor" required />

                            <input onChange={(e) => { setVehiclePlate(e.target.value) }} value={vehiclePlate} className='w-full bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Vehicle Plate' name="vehiclePlate" id="vehiclePlate" required />
                        </div>
                        <div className="flex gap-4">
                            <select onChange={(e) => { setVehicleCapacity(e.target.value) }} value={vehicleCapacity} className='w-1/2 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' name="vehicleCapacity" id="vehicleCapacity" required>
                                <option value="" disabled>Vehicle Capacity</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>

                            <select onChange={(e) => { setVehicleType(e.target.value) }} value={vehicleType} className='w-1/2 bg-[#eeeeee] rounded border px-4 py-2 text-lg placeholder:text-base' name="vehicleType" id="vehicleType" required>
                                <option value="" disabled>Vehicle Type</option>
                                <option value="toto">Toto</option>
                                <option value="rickshaw">Rickshaw</option>
                                <option value="Auto">Auto</option>

                            </select>
                        </div>
                    </div>


                    <button type='submit' className='w-full text-2xl font-bold mb-5 bg-[yellow] text-black rounded px-4 py-2 text-lg '>Sign up</button>

                    <p className='text-center my-5 text-lg'>Already Have Account ?  go to <Link to='/captain-login' className='text-blue-600'>Login</Link> </p>
                </form>
            </div>
            <div>
                <p>Click to visit <span className='text-blue-600 underline'>privacy and policy</span> of the application and here are the <span className='text-blue-600 underline'>Terms and conditions</span> of the application</p>
            </div>

        </div>
    )
}

export default CaptainSignup