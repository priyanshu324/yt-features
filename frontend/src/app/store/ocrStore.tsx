'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchOCRHistory } from '../lib/api';
import { useAuth } from './authStore';

interface OCRRecord {
    _id: string;
    text: string;
    createdAt: string;
}

interface OCRStoreContextType {
    records: OCRRecord[];
    addRecordOptimistic: (text: string) => void;
    refreshHistory: () => Promise<void>;
    clearRecords: () => void;
}

const OCRStoreContext = createContext<OCRStoreContextType | null>(null);

export function OCRStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [records, setRecords] = useState<OCRRecord[]>([]);

    const refreshHistory = async () => {
        try {
            const data = await fetchOCRHistory();
            setRecords(data);
        } catch {
            console.warn('[OCR STORE] History not loaded (user not authenticated)');
        }
    };

    useEffect(() => {
        if (user) {
            refreshHistory();
        }
    }, [user]);

    /**
     * Optimistic UI update
     * Real data will come from backend on next refresh
     */
    const addRecordOptimistic = (text: string) => {
        setRecords((prev) => [
            {
                _id: `temp-${Date.now()}`,
                text,
                createdAt: new Date().toISOString(),
            },
            ...prev,
        ]);
    };

    const clearRecords = () => setRecords([]);

    return (
        <OCRStoreContext.Provider
            value={{
                records,
                addRecordOptimistic,
                refreshHistory,
                clearRecords,
            }}
        >
            {children}
        </OCRStoreContext.Provider>
    );
}

export function useOCRStore() {
    const ctx = useContext(OCRStoreContext);
    if (!ctx) {
        throw new Error('useOCRStore must be used inside OCRStoreProvider');
    }
    return ctx;
}
