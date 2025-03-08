import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
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
  const [pickupSuggesition, setPickupSuggesition] = useState([]);
  const [destinationSuggesition, setDestinationSuggesition] = useState([]);
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setvehicleType] = useState('') // corrected initial state to an empty string

  const { user } = useContext(UserDataContext)

  const submitHandler = (e) => {
    e.preventDefault()
  }
  // handle destination onchange
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    const token = localStorage.getItem('token');
    setDestination(value);
    if (value.length > 2) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggesitions?input=${value}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDestinationSuggesition(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setDestinationSuggesition([]);
    }
  };
  // handle pickup onchange
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    const token = localStorage.getItem('token');
    setPickup(value);
    if (value.length > 2) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggesitions?input=${value}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPickupSuggesition(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setPickupSuggesition([]);
    }
  };
  // find trip
  const findTrip = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${pickup}&destination=${destination}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);

    setFare(response.data);
    if (response.data) { // use response data in if condition
      setVechilePanel(true);
      setLocationPanelOpen(false);
    }
  };
  // create ride
  const createRide = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType: vehicleType // using the updated state variable for vehicleType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);

    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };
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
          <h5 ref={locationpanelCloseRef} className='absolute top-0 right-2 text-3xl font-bold opacity-0' onClick={(e) => { setLocationPanelOpen(false);}}> <i className="ri-arrow-down-wide-line"></i></h5>
          <div className='bottom-0 w-full'>
            <h1 className="text-xl font-bold my-2">Welcome, {user ? user.fullname.firstname : 'Guest'} !</h1>

            <h4 className='text-xl font-bold'>find a trip</h4>
            <form onSubmit={submitHandler}>
              <div className="line bg-gray-500 h-16 w-1 rounded-full absolute top-[50%] left-10"></div>
              <input onClick={(e) => { setLocationPanelOpen(true); setActiveField('pickup');  }} value={pickup} onChange={handlePickupChange} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="pickup" id="pickup" placeholder='Add a pickup Location' autoComplete='off' />
              <input onClick={(e) => { setLocationPanelOpen(true); setActiveField('destination');  }} value={destination} onChange={handleDestinationChange} className='bg-[#eee] px-10 py-3 rounded-lg text-lg font-semibold w-full mt-3' type="text" name="destination" id="destination" placeholder='Enter Destination' autoComplete='off' />

            </form>
            <button
              className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full text-lg font-semibold"
              onClick={findTrip}
            >
              Find Trip
            </button>
          </div>
        </div>

        <div ref={panelRef} className='bg-white h-0 border-t-2 rounded-xl border-gray-300'>
          <LocationSearchPanel
            setVechilePanel={setVechilePanel}
            setLocationPanelOpen={setLocationPanelOpen}
            suggestions={activeField === 'pickup' ? pickupSuggesition : destinationSuggesition}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vechilePanelRef} className='fixed z-10 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <VaichlePanel setvehicleType={setvehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <ConfirmRide fare={fare} vehicleType={vehicleType} createRide={createRide} pickup={pickup} destination={destination} setConfirmRidePanel={setConfirmRidePanel} setvaichleFoundPanel={setvaichleFoundPanel} />
      </div>

      <div ref={vechileFoundRef} className='fixed z-10 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <LookingForDriver fare={fare} vehicleType={vehicleType} pickup={pickup} destination={destination} setVechilePanel={setVechilePanel} setvaichleFoundPanel={setvaichleFoundPanel} setWaitingForDriver={setWaitingForDriver} />
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bg-white px-3 py-6 w-full bottom-0 translate-y-full pt-12'>
        <WaitForDriver />
      </div>

    </div>
  )
}

export default UserHome