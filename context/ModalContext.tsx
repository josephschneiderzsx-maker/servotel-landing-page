
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 'dining' | 'transfer' | 'concierge' | 'business' | 'events' | 'privacy' | 'terms' | 'shuttle' | 'room_details' | null;

interface ModalContextType {
    activeModal: ModalType;
    modalData: any;
    openModal: (type: ModalType, data?: any) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [modalData, setModalData] = useState<any>(null);

    const openModal = (type: ModalType, data?: any) => {
        setActiveModal(type);
        if (data) {
            setModalData(data);
        } else {
            setModalData(null);
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};
