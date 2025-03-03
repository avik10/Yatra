import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>

            <Link to='/user-home'><div className='flex fixed h-10 w-10 bg-white items-center justify-center rounded-full left-2'>
                <i className="ri-home-4-line text-lg font-bold"></i>
            </div> </Link>
            <div className="h-1/2 w-screen">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
            </div>
            <div className="h-1/2 w-screen p-4">


                <div className='flex justify-between items-center'>
                    <img className='h-20 w-20 rounded-full border-2 border-gray-500' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Avik</h2>
                        <h3 className='text-xl font-bold'>WB 68 AJ 4040</h3>
                        <p className=' text-gray-500'>Royal enfield Meteor</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between items-center'>

                    <div className='w-full mt-5'>

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

                </div>


                <button type="submit" className='w-full mt-5 bg-black text-white px-4 py-2 rounded-lg justify-center items-center'>Mske Payment</button>
            </div>
        </div>
    )
}

export default Riding