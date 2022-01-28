import { createContext, useState } from "react";

export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    return (
        <MessageContext.Provider value={{ username, setUsername }}>
            {children}
        </MessageContext.Provider>
    )
}