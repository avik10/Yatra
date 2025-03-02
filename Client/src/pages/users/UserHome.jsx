import React, { useContext, useState, useRef } from 'react'
import { UserDataContext } from '../../context/userContext'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const UserHome = () => {
  const panelRef = useRef(null)

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)

  const { user } = useContext(UserDataContext)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '50%'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
    }
  }, [panelOpen])

  return (
    <div className='h-screen relative'>

      <div className="h-screen w-screen">
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">


        <div className="bg-white p-6 h-[30%] relative">
          <div className='bottom-0 w-full'>
            <h1 className="text-xl font-bold my-2">Welcome, {user ? user.fullname.firstname : 'Guest'} !</h1>

            <h4 className='text-xl font-bold'>find a trip</h4>

            <form onSubmit={submitHandler}>
              <div className="line bg-gray-500 h-16 w-1 rounded-full absolute top-[60%] left-10"></div>
              <input onClick={(e) => setPanelOpen(true)} value={pickup} onChange={(e) => { setPickup(e.target.value) }} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="pickup" id="pickup" placeholder='Add a pickup Location' autoComplete='off' />
              <input onClick={(e) => setPanelOpen(true)} value={destination} onChange={(e) => { setDestination(e.target.value) }} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="destination" id="destination" placeholder='Enter Destinaion' autoComplete='off' />
              <button type="submit" className='mt-4 bg-black text-white px-4 py-2 rounded-lg justify-center'>Confirm Ride</button>
            </form>
          </div>
        </div>

        <div ref={panelRef} className='bg-red-500 h-0'>
          
        </div>

      </div>


    </div>
  )
}

export default UserHome