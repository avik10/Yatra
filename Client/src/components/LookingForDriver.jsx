import React, { } from 'react'

const LookingForDriver = (props) => {





    return (
        <div>
            <h5 className='absolute w-full top-0 text-center font-light  mb-2 ' onClick={(e) => { props.setvaichleFoundPanel(false); props.setVechilePanel(false) }}> <i className="ri-arrow-down-wide-line text-4xl text-gray-400"></i></h5>
            <h4 className='text-xl font-bold'>Looking For Driver</h4>
            <div className='flex flex-col justify-between items-center'>
                <img className='h-50 w-50' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
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

            </div>
        </div>
    )
}

export default LookingForDriver