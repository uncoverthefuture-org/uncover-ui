
import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { deleteDatabaseAsync, openDatabaseAsync, SQLiteProvider, type SQLiteOpenOptions } from 'expo-sqlite'
import type { SqliteDatabaseProviderContextProps, SqliteDatabaseProviderProps } from './interface';


export const SqliteDatabaseProviderContext = createContext<SqliteDatabaseProviderContextProps>({
    database: undefined,
    isLoading: false,
    isClearing: false,
    clearDatabase: () => new Promise(() => { }),
});

export const SqliteDatabaseProvider: React.FC<SqliteDatabaseProviderProps> = ({
    databaseName = "app.testDb",
    source,
    children,
    ...rest
}) => {
    const [states, setStates] = useState({ isLoading: true, isClearing: false })
    const [database, setDatabase] = useState(source);

    const clearDatabase = () => {
        setStates((prev) => ({ ...prev, isClearing: true }));
        return new Promise<boolean>((resolve, reject) => {
            if (database) {
                database.closeAsync();
                deleteDatabaseAsync(databaseName).then(() => {
                    openDatabase(databaseName);
                    resolve(true)
                }).catch(() => {
                    reject(false)
                }).finally(() => {
                    setStates((prev) => ({ ...prev, isClearing: false }));
                })
            }
        })
    }

    const openDatabase = (dbName: string = databaseName, options?: SQLiteOpenOptions) => {
        setStates((prev) => ({ ...prev, isLoading: true }))
        openDatabaseAsync(dbName, options).then((db) => {
            setDatabase(db);
            setStates((prev) => ({ ...prev, isLoading: false }))
        }).finally(() => {
            setStates((prev) => ({ ...prev, isLoading: false }))
        })
    }

    useEffect(() => {
        if (database && states.isLoading) {
            setStates((prev) => ({ ...prev, isLoading: false }));
        }
    }, [database])

    useEffect(() => {
        openDatabase();
    }, [])


    return (
        <SqliteDatabaseProviderContext.Provider value={{
            database,
            clearDatabase,
            ...states,
        }}>
            <SQLiteProvider
                databaseName={databaseName}
                onInit={async (db) => setDatabase(db)}
                {...rest}
            >
                {children}
            </SQLiteProvider>
        </SqliteDatabaseProviderContext.Provider>
    )
};