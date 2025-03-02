import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, loading, setLoading, error, setError }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;