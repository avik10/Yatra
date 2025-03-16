import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${import.meta.env.VITE_BASE_URL}`, {
            transports: ['websocket'],
        });
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const sendMessage = (eventName, message) => {
        console.log('sending message', message);
        
        if (socket) {
            socket.emit(eventName, message);
        }
    };

    const receiveMessage = (eventName, callback) => {
        if (socket) {
            socket.on(eventName, callback);
        }
    };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
