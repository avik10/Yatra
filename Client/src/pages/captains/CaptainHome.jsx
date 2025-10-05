import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetailsPanel from './CaptainDetailsPanel'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainRidingPanel from '../../components/CaptainRidingPanel'
import CaptainRidingConfirmPanel from '../../components/CaptainRidingConfirmPanel'
import { CaptainDataContext } from '../../context/CaptainContext'
import { useSocket, SocketContext } from '../../context/SocketContext';
const CaptainHome = () => {

  const RidePanelRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)

  const [RidePanel, setRidePanel] = useState(false)
  const [CaptainconfirmRidePanel, setCaptainconfirmRidePanel] = useState(false)

  const { captain } = useContext(CaptainDataContext)
  const { sendMessage, receiveMessage } = useSocket()

  const { socket } = useContext(SocketContext)



  useEffect(() => {
    sendMessage('join', { userType: 'captain', userId: captain._id })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          sendMessage('update-location-captain', { userId: captain._id, lat: latitude, lng: longitude });
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation()
    console.log('Location update interval set.');
    return () => clearInterval(locationInterval);
  }, [])


  receiveMessage('new-ride', (data) => {
    console.log(data)
  });

  // Captain confirm Ride Panel
  useGSAP(() => {
    if (CaptainconfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [CaptainconfirmRidePanel])


  // captain Ride Panel
  useGSAP(() => {
    if (RidePanel) {
      gsap.to(RidePanelRef.current, {
        translateY: '0%',
        opacity: 1
      })
    } else {
      gsap.to(RidePanelRef.current, {
        translateY: '100%',
        opacity: 0
      })

    }
  }, [RidePanel])


  return (
    <div className='h-screen'>
      <div className='flex'>
        {/* <img src='https://i.pinimg.com/736x/db/67/55/db67557e8d75747aaaa4c9c6a0ec909c.jpg' alt="Logo" className='h-25 w-25 p-5' /> */}
        <Link to='/captain-home'>
          <div className='flex fixed h-10 w-10 bg-white items-center justify-center rounded-full top-2 right-2'>
            <i className="ri-logout-circle-r-line text-lg font-bold"></i>
          </div>
        </Link>
      </div>
      <div className="h-3/5 w-screen">
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>
      <div className="h-2/5 w-screen">

        <CaptainDetailsPanel />

        <div ref={RidePanelRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full   pt-12'>
          <CaptainRidingPanel setRidePanel={setRidePanel} setCaptainconfirmRidePanel={setCaptainconfirmRidePanel} />
        </div>

        <div ref={ConfirmRidePanelRef} className='fixed h-screen z-10 bottom-0 bg-white px-3 py-6 w-full pt-12'>
          <CaptainRidingConfirmPanel setRidePanel={setRidePanel} setCaptainconfirmRidePanel={setCaptainconfirmRidePanel} />
        </div>

      </div>
    </div>
  )
}

export default CaptainHome