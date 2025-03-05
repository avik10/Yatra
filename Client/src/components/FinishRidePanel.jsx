import React from 'react'
import { Link } from 'react-router-dom'

const FinishRidePanel = (props) => {


    const submitHandler = (e) => {

        e.preventDefault();

    }

    return (
        <div>
            <h5 className='absolute w-full top-0 text-center font-light mb-2 ' onClick={(e) => { props.setFinishRidePanel(false) }}> <i className="ri-arrow-down-wide-line text-4xl text-gray-400"></i></h5>
            <h4 className='text-xl font-bold'>Confirm This Ride to Start</h4>

            <div className='flex justify-between items-center mt-5 px-5 bg-black p-5 rounded-lg'>
                <div>
                    <img className='h-20 w-20 rounded-full object-cover border-2 border-white' src="data:image/jpeg;base64,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" alt="" />
                    <h3 className='text-lg font-semibold text-white mt-2'>Avik Bhatta</h3>
                </div>
                <h5 className='text-lg font-semibold text-white'>2 .2 km Away</h5>
            </div>
            <div className='flex flex-col justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-map-pin-fill text-lg"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'><span>From: </span>ABC loc</h3>
                            <p className='font-sm text-gray-500'>DEF loc</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-map-pin-2-fill text-lg"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'><span>To: </span>ABC loc</h3>
                            <p className='font-sm text-gray-500'>DEF loc</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-money-rupee-circle-fill"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'>125.97</h3>
                            <p className='font-sm text-gray-500'>cash cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <Link to={'/captain-home'} className='w-full flex justify-center font-bold  bg-green-500 text-white rounded px-4 py-2 text-lg placeholder:text-base'>Finish Ride</Link>
                    <p className='text-red-500 mt-5 text-xs'>Click to <span className='font-bold'>Finish Ride</span> button to if you Complete the payment</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRidePanel