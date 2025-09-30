// src/redux/Providers.tsx
/*"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}*/
"use client";

import React, { useEffect, useCallback } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const useDisableCopyPaste = (onActionPrevented: () => void) => {
    
    const disableAction = useCallback((e: Event) => {
        
        e.preventDefault();
        e.stopPropagation();

        if (onActionPrevented) {
            onActionPrevented();
        }
    }, [onActionPrevented]);

    const handleKeydown = useCallback((e: KeyboardEvent) => {
        
        const isCtrlOrCmd = e.ctrlKey || e.metaKey; 
        
        if (isCtrlOrCmd && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) {
            
            disableAction(e as unknown as Event); 
        }
    }, [disableAction]);

    useEffect(() => {
       
        document.addEventListener('copy', disableAction as (e: Event) => void);
        document.addEventListener('paste', disableAction as (e: Event) => void);
        document.addEventListener('contextmenu', disableAction as (e: Event) => void);
        document.addEventListener('keydown', handleKeydown as (e: Event) => void);
        return () => {
            document.removeEventListener('copy', disableAction as (e: Event) => void);
            document.removeEventListener('paste', disableAction as (e: Event) => void);
            document.removeEventListener('contextmenu', disableAction as (e: Event) => void);
            document.removeEventListener('keydown', handleKeydown as (e: Event) => void);
        };
    }, [disableAction, handleKeydown]);
};

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    
    const handleActionPrevented = useCallback(() => {
        console.warn("Security policy blocked Copy/Paste/Context Menu action.");
    }, []);

    useDisableCopyPaste(handleActionPrevented);

    return (
        <ReduxProvider store={store}> 
            {children}
        </ReduxProvider>
    );
}
