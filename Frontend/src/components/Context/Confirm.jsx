import { Trash2 } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

const ConfirmContext = createContext();

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) throw new Error('useConfirm must be used within a ConfirmProvider');
    return context;
};

export const ConfirmProvider = ({ children }) => {
    const [config, setConfig] = useState(null);

    const confirm = (message, title = 'Confirm Deletion') => {
        return new Promise((resolve) => {
            setConfig({ message, title, resolve });
        });
    };

    const handleClose = (result) => {
        config?.resolve(result);
        setConfig(null);
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            {config && (
                <div
                    onClick={() => handleClose(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300"
                    >
                        <div className="p-8 pb-6">
                            <div className="flex items-center gap-4 mb-4 text-red-500">
                                <div className="p-3 bg-red-500/10 rounded-2xl">
                                    <Trash2 size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                                    {config.title}
                                </h3>
                            </div>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                {config.message}
                            </p>
                        </div>
                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                onClick={() => handleClose(false)}
                                className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-[var(--color-bg)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] border border-[var(--color-border)]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleClose(true)}
                                className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

export default ConfirmProvider;
