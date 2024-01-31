"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({children}: {children: ReactNode}) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
     );
}
 
export defaul"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({children}: {children: ReactNode}) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
     );
}
 
export defaul