import React from 'react'

const VaichlePanel = (props) => {
    const handleClick = (vechileType) => {
        props.setvehicleType(vechileType);
        props.setConfirmRidePanel(true);
        props.setVechilePanel(false);
    }


    return (
        <div>
            <h5 className='absolute w-full top-0 text-center font-light  mb-2 ' onClick={(e) => { props.setVechilePanel(false); }}> <i className="ri-arrow-down-wide-line text-4xl text-gray-400"></i></h5>
            <h4 className='text-xl font-bold'>Choose a vaichle</h4>

            <div onClick={(e) => { handleClick('auto')}} className='flex items-center justify-between p-3 bg-gray-100 border-2 border-gray-300  active:border-black rounded-xl my-2'>
                <img className='h-12 w-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-lg'>Auto <span><i className="ri-user-3-fill"></i></span>4</h4>
                    <h5 className='font-medium text-sm'>2 mints away from you</h5>
                    <p className='font-normal text-xs'>Affordable compact rides </p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.auto}</h2>
            </div>

            <div onClick={(e) => { handleClick('rickshaw') }} className='flex items-center justify-between p-3 bg-gray-100 border-2 border-gray-300  active:border-black rounded-xl my-2'>
                <img className='h-12 w-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCcw3hZSh83qAmn5cXJV48pLoe9VC2Md_Tw&s" alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-lg'>Rickshaw <span><i className="ri-user-3-fill"></i></span>2</h4>
                    <h5 className='font-medium text-sm'>2 mints away from you</h5>
                    <p className='font-normal text-xs'>Affordable rides </p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.rickshaw}</h2>
            </div>

            <div onClick={(e) => {handleClick('toto') }} className='flex items-center justify-between p-3 bg-gray-100 border-2 border-gray-300 active:border-black rounded-xl my-2'>
                <img className='h-12 w-12' src="https://w7.pngwing.com/pngs/545/826/png-transparent-lucknow-kanpur-electric-rickshaw-electric-vehicle-auto-rickshaw-electronics-mode-of-transport-india-thumbnail.png" alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-lg'>Toto <span><i className="ri-user-3-fill"></i></span>4</h4>
                    <h5 className='font-medium text-sm'>3 mints away from you</h5>
                    <p className='font-normal text-xs'>Affordable and perfect rides </p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.toto}</h2>
            </div>
        </div>
    )
}

export default VaichlePanel