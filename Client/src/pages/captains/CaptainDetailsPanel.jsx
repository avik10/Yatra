// Desc: Captain Details Panel Component
import React, { useContext } from 'react'
import { CaptainDataContext } from '../../context/CaptainContext'

const CaptainDetailsPanel = () => {

    const { captain } = useContext(CaptainDataContext)
    console.log(captain);
    

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center '>
                <div className='flex jsutify-start items-center gap-4'>
                    <img className='h-20 w-20 rounded-full' src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h4 className='text-lg font-medium'>{captain.fullname.firstname} {captain.fullname.lastname}</h4>
                </div>

                <div className='flex justify-end items-center 2'>
                    <h2 className='h-10 w-10 flex justify-center items-center rounded-full text-xl'>
                        <i className="ri-money-rupee-circle-fill"></i>
                    </h2>
                    <div>
                        <h3 className='font-medium text-lg'>125.97</h3>
                        <p className='font-sm text-gray-500'>earned</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly items-center mt-4 bg-yellow-400 p-5 rounded-lg'>
                <div className='text-center flex flex-col'>
                    <h2 className='h-10 w-10 flex justify-center items-center rounded-full text-xl pl-5'>
                        <i className="ri-time-fill text-xl font-extralight"></i>
                    </h2>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-500'>hrs online</p>
                </div>

                <div className='text-center flex flex-col'>
                    <h2 className='h-10 w-10 flex justify-center items-center rounded-full text-xl pl-5'>
                        <i className="ri-speed-up-line text-xl font-extralight"></i>
                    </h2>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-500'>hrs online</p>
                </div>

                <div className='text-center flex flex-col'>
                    <h2 className='h-10 w-10 flex justify-center items-center rounded-full text-xl pl-5'>
                        <i className="ri-article-line text-xl font-extralight"></i>
                    </h2>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-500'>hrs online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetailsPanel