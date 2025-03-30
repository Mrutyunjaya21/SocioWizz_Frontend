import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [generatedText, setGeneratedText] = useState('');

    return (
        <TextContext.Provider value={{ generatedText, setGeneratedText }}>
            {children}
        </TextContext.Provider>
    );
};
