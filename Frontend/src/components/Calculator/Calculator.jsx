import { useState, useEffect, useCallback } from 'react';
import { X, Delete, Calculator as CalcIcon } from 'lucide-react';

const Calculator = ({ isOpen, onClose }) => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [history, setHistory] = useState([]);

    const handleNumber = useCallback((num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    }, [display, waitingForOperand]);

    const handleDecimal = useCallback(() => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    }, [display, waitingForOperand]);

    const handleOperation = useCallback((nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = performCalculation(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    }, [display, previousValue, operation]);

    const performCalculation = (firstValue, secondValue, op) => {
        switch (op) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                return secondValue !== 0 ? firstValue / secondValue : 0;
            case '%':
                return firstValue % secondValue;
            default:
                return secondValue;
        }
    };

    const handleEquals = useCallback(() => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const result = performCalculation(previousValue, inputValue, operation);
            const calculation = `${previousValue} ${operation} ${inputValue} = ${result}`;

            setHistory(prev => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    }, [display, previousValue, operation]);

    const handleClear = useCallback(() => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    }, []);

    const handleBackspace = useCallback(() => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    }, [display]);

    const handlePercentage = useCallback(() => {
        const value = parseFloat(display);
        setDisplay(String(value / 100));
    }, [display]);

    const handleNegate = useCallback(() => {
        const value = parseFloat(display);
        setDisplay(String(value * -1));
    }, [display]);

    // Keyboard support
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyPress = (e) => {
            e.preventDefault();

            if (e.key >= '0' && e.key <= '9') {
                handleNumber(e.key);
            } else if (e.key === '.') {
                handleDecimal();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
                handleOperation(op);
            } else if (e.key === 'Enter' || e.key === '=') {
                handleEquals();
            } else if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'Backspace') {
                handleBackspace();
            } else if (e.key === 'c' || e.key === 'C') {
                handleClear();
            } else if (e.key === '%') {
                handlePercentage();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isOpen, handleNumber, handleDecimal, handleOperation, handleEquals, handleBackspace, handleClear, handlePercentage, onClose]);

    if (!isOpen) return null;

    const Button = ({ children, onClick, variant = 'default', className = '' }) => {
        const baseStyle = "flex items-center justify-center rounded-2xl font-bold text-lg transition-all active:scale-95 select-none";
        const variants = {
            default: "bg-[var(--color-surface)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)] shadow-sm border border-[var(--color-border)]",
            operation: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/25",
            clear: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
            equals: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25"
        };

        return (
            <button
                onClick={onClick}
                className={`${baseStyle} ${variants[variant]} ${className}`}
            >
                {children}
            </button>
        );
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="w-full max-w-md bg-[var(--color-background)] rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-[var(--color-primary)] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <CalcIcon size={22} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Business Calculator</h2>
                            <p className="text-xs text-white/80">Fast & Easy Calculations</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Display */}
                <div className="px-6 py-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                    {operation && (
                        <div className="text-sm text-[var(--color-muted-foreground)] mb-1 font-medium">
                            {previousValue} {operation}
                        </div>
                    )}
                    <div className="text-right text-4xl md:text-5xl font-bold text-[var(--color-foreground)] break-all min-h-[3rem] flex items-center justify-end">
                        {display}
                    </div>
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div className="px-6 py-3 bg-[var(--color-muted)]/30 border-b border-[var(--color-border)]">
                        <div className="text-xs font-semibold text-[var(--color-muted-foreground)] mb-2">Recent Calculations</div>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                            {history.slice(0, 3).map((calc, index) => (
                                <div key={index} className="text-xs text-[var(--color-muted-foreground)] font-mono">
                                    {calc}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="p-6">
                    <div className="grid grid-cols-4 gap-3">
                        {/* Row 1 */}
                        <Button variant="clear" onClick={handleClear}>AC</Button>
                        <Button onClick={handleNegate}>+/-</Button>
                        <Button onClick={handlePercentage}>%</Button>
                        <Button variant="operation" onClick={() => handleOperation('÷')}>÷</Button>

                        {/* Row 2 */}
                        <Button onClick={() => handleNumber('7')}>7</Button>
                        <Button onClick={() => handleNumber('8')}>8</Button>
                        <Button onClick={() => handleNumber('9')}>9</Button>
                        <Button variant="operation" onClick={() => handleOperation('×')}>×</Button>

                        {/* Row 3 */}
                        <Button onClick={() => handleNumber('4')}>4</Button>
                        <Button onClick={() => handleNumber('5')}>5</Button>
                        <Button onClick={() => handleNumber('6')}>6</Button>
                        <Button variant="operation" onClick={() => handleOperation('-')}>-</Button>

                        {/* Row 4 */}
                        <Button onClick={() => handleNumber('1')}>1</Button>
                        <Button onClick={() => handleNumber('2')}>2</Button>
                        <Button onClick={() => handleNumber('3')}>3</Button>
                        <Button variant="operation" onClick={() => handleOperation('+')}>+</Button>

                        {/* Row 5 */}
                        <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                        <Button onClick={handleDecimal}>.</Button>
                        <Button variant="equals" onClick={handleEquals}>=</Button>
                    </div>

                    {/* Backspace */}
                    <div className="mt-3">
                        <Button onClick={handleBackspace} className="w-full">
                            <Delete size={20} className="mr-2" />
                            Backspace
                        </Button>
                    </div>
                </div>

                {/* Keyboard Hint */}
                <div className="px-6 pb-4 text-center">
                    <p className="hidden md:block text-xs text-[var(--color-muted-foreground)]">
                        💡 Tip: Use your keyboard for faster calculations • Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-muted)] font-mono">ESC</kbd> to close
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
