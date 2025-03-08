import React from 'react';

const LocationSearchPanel = (props) => {
 
    const handleClick = (location) => {
        if (props.activeField === 'pickup') {
            props.setPickup(location.description);
        } else if (props.activeField === 'destination') {
            props.setDestination(location.description);
        }
        console.log(location);
    }

    return (
        <div>
            {
                props.suggestions.map((location, index) => {
                    return (
                        <div
                            onClick={() => { handleClick(location) }}
                            key={index}
                            className='flex items-center justify-start gap-4 my-4 p-0 border-2 border-gray-50 active:border-black rounded-xl'
                        >
                            <h2 className='bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                                <i className="ri-map-pin-fill"></i>
                            </h2>
                            <h4 className='font-medium text-lg'>{location.description}</h4>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LocationSearchPanel;