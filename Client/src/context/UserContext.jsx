import React, { createContext, useState } from 'react'

const UserContext = ({ children }) => {

    const UserDataContext = createContext()

    const [user, setuser] = useState({
        fullname: {
            firstname: '',
            lastname: '',
        },
        email: '',
        // password: ''
    })


    return (
        <div>
            <UserDataContext.Provider value={[user, setuser]}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext