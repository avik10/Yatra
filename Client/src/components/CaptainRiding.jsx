import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRidePanel from './FinishRidePanel'

const CaptainRiding = () => {


    const RideFinishPanelRef = useRef(null)
    const [finishRidePanel, setFinishRidePanel] = useState(false) // updated to use false as initial state


    // captain finish Panel
    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(RideFinishPanelRef.current, {
                translateY: '0%',
                opacity: 1
            })
        } else {
            gsap.to(RideFinishPanelRef.current, {
                translateY: '100%',
                opacity: 0
            })

        }
    }, [finishRidePanel])


    return (
        <div className='h-screen'>
            <div className='flex'>
                {/* <img src='https://i.pinimg.com/736x/db/67/55/db67557e8d75747aaaa4c9c6a0ec909c.jpg' alt="Logo" className='h-25 w-25 p-5' /> */}
                <Link to='/user-home'>
                    <div className='flex fixed h-10 w-10 bg-white items-center justify-center rounded-full top-2 right-2'>
                        <i className="ri-logout-circle-r-line text-lg font-bold"></i>
                    </div>
                </Link>
            </div>
            <div className="h-4/5 w-screen">

                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
            </div>
            <div onClick={(e)=> {setFinishRidePanel(true)}} className="h-1/5 w-screen p-6 bg-yellow-300 flex flex-col items-center justify-center relative">
                <h5 className='absolute w-full top-0 text-center font-light mb-2 '> <i className="ri-arrow-up-wide-line text-4xl text-gray-400"></i></h5>
                <h4 className='text-2xl font-semibold'>4 km away</h4>
                <button type='submit' className='w-full  font-bold mt-5  bg-green-500 text-black rounded px-4 py-2 text-lg placeholder:text-base'>Complete Ride</button>
            </div>

            <div ref={RideFinishPanelRef} className='fixed z-10 bottom-0 bg-white px-3 py-6 w-full pt-12'>
                <FinishRidePanel setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding