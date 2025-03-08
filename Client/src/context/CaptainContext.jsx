import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(captain);

    const updateCaptain = (newData) => {
        setCaptain(prevCaptain => ({ ...prevCaptain, ...newData }));
    };
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain: updateCaptain, loading, setLoading, error, setError }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;