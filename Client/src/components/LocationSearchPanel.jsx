import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        'ABC loc',
        'DEF loc',
        'GHI loc',
        'ABC loc',
    ]

    return (
        <div>
            {/* this is sample data  */}
            {
                locations.map((location, index) => {
                    return (
                        <div onClick={() => { props.setVechilePanel(true); props.setLocationPanelOpen(false) }} key={index} className='flex items-center justify-start gap-4 my-4 p-0  border-2 border-gray-50  active:border-black rounded-xl '>
                            <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'><i className="ri-map-pin-fill"></i></h2>
                            <h4 className='font-medium text-lg'>{location}</h4>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default LocationSearchPanel