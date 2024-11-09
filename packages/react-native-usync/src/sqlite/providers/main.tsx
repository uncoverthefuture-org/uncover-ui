
import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import * as SQLite from 'expo-sqlite/legacy'
import type { SqliteDatabaseProviderContextProps, SqliteDatabaseProviderProps } from './interface';


export const SqliteDatabaseProviderContext = createContext<SqliteDatabaseProviderContextProps>({
    database: undefined,
    isLoading: false,
    isClearing: false,
    clearDatabase: () => new Promise(() => { }),
});

export const SqliteDatabaseProvider: React.FC<SqliteDatabaseProviderProps> = ({
    defaultSourceFile = "app.testDb",
    source = SQLite.openDatabase(defaultSourceFile),
    children
}) => {
    const [states, setStates] = useState({ isLoading: true, isClearing: false })
    const [database, setDatabase] = useState(source);

    const clearDatabase = () => {
        setStates((prev) => ({ ...prev, isClearing: true }));
        return new Promise<boolean>((resolve, reject) => {
            database.closeAsync();
            database.deleteAsync().then(() => {
                setDatabase(SQLite.openDatabase(defaultSourceFile))
                resolve(true)
            }).catch(() => {
                reject(false)
            }).finally(() => {
                setStates((prev) => ({ ...prev, isClearing: false }));
            })
        })
    }

    useEffect(() => {
        if (database && states.isLoading) {
            setStates((prev) => ({ ...prev, isLoading: false }));
        }
    }, [database])


    return (
        <SqliteDatabaseProviderContext.Provider value={{
            database,
            clearDatabase,
            isLoading: states.isLoading,
            isClearing: states.isClearing,
        }}>
            {children}
        </SqliteDatabaseProviderContext.Provider>
    )
};