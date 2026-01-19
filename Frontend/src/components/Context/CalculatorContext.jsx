import { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    const openCalculator = () => setIsCalculatorOpen(true);
    const closeCalculator = () => setIsCalculatorOpen(false);
    const toggleCalculator = () => setIsCalculatorOpen(prev => !prev);

    return (
        <CalculatorContext.Provider value={{
            isCalculatorOpen,
            openCalculator,
            closeCalculator,
            toggleCalculator
        }}>
            {children}
        </CalculatorContext.Provider>
    );
};

export const useCalculator = () => {
    const context = useContext(CalculatorContext);
    if (!context) {
        throw new Error('useCalculator must be used within CalculatorProvider');
    }
    return context;
};
