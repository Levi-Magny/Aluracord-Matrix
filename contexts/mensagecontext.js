import { createContext, useState } from "react";

export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <MessageContext.Provider value={{ username, setUsername, showModal, setShowModal }}>
            {children}
        </MessageContext.Provider>
    )
}