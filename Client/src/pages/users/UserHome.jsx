import React, { useContext, useState, useRef } from 'react'
import { UserDataContext } from '../../context/userContext'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VaichlePanel from '../../components/VaichlePanel';
import ConfirmRide from '../../components/ConfirmRide';
import WaitForDriver from '../../components/WaitingForDriver';
import LookingForDriver from '../../components/LookingForDriver';




const UserHome = () => {
  const panelRef = useRef(null)
  const locationpanelCloseRef = useRef(null)
  const vechilePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vechileFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [locationpanelOpen, setLocationPanelOpen] = useState(false)
  const [vechilePanel, setVechilePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vaichleFoundPanel, setvaichleFoundPanel] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const { user } = useContext(UserDataContext)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // location panel
  useGSAP(() => {
    if (locationpanelOpen) {
      gsap.to(panelRef.current, {
        height: '50%',
        opacity: 1,
        padding: 24
      })
      gsap.to(locationpanelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 1,
        padding: 0
      })
      gsap.to(locationpanelCloseRef.current, {
        opacity: 0
      })
    }
  }, [locationpanelOpen])


  // vaichle panel
  useGSAP(() => {
    if (vechilePanel) {
      gsap.to(vechilePanelRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(vechilePanelRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [vechilePanel])


  // confirm ride panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [confirmRidePanel])

  // found vechile panel
  useGSAP(() => {
    if (vaichleFoundPanel) {
      gsap.to(vechileFoundRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(vechileFoundRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [vaichleFoundPanel])

  // waiting For Driver panel
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [waitingForDriver])




  return (
    <div className='h-screen relative overflow-hidden'>

      <div className="h-screen w-screen">
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">

        <div className="bg-white p-6 h-[35%] relative">
          <h5 ref={locationpanelCloseRef} className='absolute top-0 right-2 text-3xl font-bold opacity-0' onClick={(e) => { setLocationPanelOpen(false); setVechilePanel(false); }}> <i className="ri-arrow-down-wide-line"></i></h5>
          <div className='bottom-0 w-full'>
            <h1 className="text-xl font-bold my-2">Welcome, {user ? user.fullname.firstname : 'Guest'} !</h1>

            <h4 className='text-xl font-bold'>find a trip</h4>
            <form onSubmit={submitHandler}>
              <div className="line bg-gray-500 h-16 w-1 rounded-full absolute top-[50%] left-10"></div>
              <input onClick={(e) => setLocationPanelOpen(true)} value={pickup} onChange={(e) => { setPickup(e.target.value) }} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="pickup" id="pickup" placeholder='Add a pickup Location' autoComplete='off' />
              <input onClick={(e) => setLocationPanelOpen(true)} value={destination} onChange={(e) => { setDestination(e.target.value) }} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="destination" id="destination" placeholder='Enter Destination' autoComplete='off' />

            </form>
          </div>
        </div>

        <div ref={panelRef} className='bg-white h-0 border-t-2 rounded-xl border-gray-300'>
          <LocationSearchPanel setVechilePanel={setVechilePanel} setLocationPanelOpen={setLocationPanelOpen} />
        </div>
      </div>

      <div ref={vechilePanelRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <VaichlePanel setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setvaichleFoundPanel={setvaichleFoundPanel} />
      </div>

      <div ref={vechileFoundRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <LookingForDriver setVechilePanel={setVechilePanel} setvaichleFoundPanel={setvaichleFoundPanel} setWaitingForDriver={setWaitingForDriver} />
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <WaitForDriver />
      </div>

    </div>
  )
}

export default UserHome