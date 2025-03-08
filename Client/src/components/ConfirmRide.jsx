import React from 'react'

const ConfirmRide = (props) => {

    const confirmRide = (e) => {
        props.setvaichleFoundPanel(true);
        props.setConfirmRidePanel(false);
        props.createRide();
    };

    return (
        <div>
            <h5 className='absolute w-full top-0 text-center font-light  mb-2 ' onClick={(e) => { props.setConfirmRidePanel(false) }}> <i className="ri-arrow-down-wide-line text-4xl text-gray-400"></i></h5>
            <h4 className='text-xl font-bold'>Confirm Your Ride</h4>
            <div className='flex flex-col justify-between items-center'>
                <img className='h-50 w-50' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-map-pin-fill text-lg"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'><span>From: </span>
                                <p className='font-sm text-gray-500'>{props.pickup}</p>
                            </h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-map-pin-2-fill text-lg"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'><span>To: </span>
                                <p className='font-sm text-gray-500'>{props.destination}</p>
                            </h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 border-gray-200 p-2'>
                        <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                            <i className="ri-money-rupee-circle-fill"></i>
                        </h2>
                        <div>
                            <h3 className='font-medium text-lg'>{props.fare[props.vehicleType]}</h3>
                            <p className='font-sm text-gray-500'>cash cash</p>
                        </div>
                    </div>
                </div>
                <button type="submit" onClick={confirmRide} className='w-full mt-5 bg-black text-white px-4 py-2 rounded-lg justify-center items-center'>Confirm Ride</button>
            </div>
        </div>
    )
}

export default ConfirmRide