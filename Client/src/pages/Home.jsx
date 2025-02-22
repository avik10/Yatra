import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-[url(https://static.wixstatic.com/media/246cd6_fa005e2a6bcd4401ba43990fc7c8d132~mv2.jpg/v1/fill/w_640,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/246cd6_fa005e2a6bcd4401ba43990fc7c8d132~mv2.jpg)] bg-cover bg-center h-screen w-full flex justify-between flex-col'>
            <img src='https://i.pinimg.com/736x/db/67/55/db67557e8d75747aaaa4c9c6a0ec909c.jpg' alt="Logo" className='h-25 w-25 p-5' />
            <div className="bg-white p-5 pb-7">
                <h2 className='text-2xl font-bold'>Let's Get Start Yatra</h2>
                <Link to='/login' className='flex text-3xl font-bold items-center justify-center w-full bg-black text-white text-2xl py-3 rounded mt-4'>Continue</Link>
            </div>
        </div>
    )
}

export default Home