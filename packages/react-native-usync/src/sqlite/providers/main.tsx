
import React, { useMemo } from 'react';
import { createContext, useState } from "react";
import { deleteDatabaseAsync } from 'expo-sqlite';
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
    // ...rest
}) => {
    const [states, setStates] = useState({ isLoading: true, isClearing: false })
    const database = useMemo(() => source, []);

    const clearDatabase = () => {
        setStates((prev) => ({ ...prev, isClearing: true }));
        return new Promise<boolean>((resolve, reject) => {
            if (database) {
                database.closeAsync();
                deleteDatabaseAsync(databaseName).then(() => {
                    // openDatabase(databaseName);
                    resolve(true)
                }).catch(() => {
                    reject(false)
                }).finally(() => {
                    setStates((prev) => ({ ...prev, isClearing: false }));
                })
            }
        })
    }


    return (
        <SqliteDatabaseProviderContext.Provider value={{
            database,
            clearDatabase,
            ...states,
        }}>
            {/* <SQLiteProvider
                databaseName={databaseName}
                onInit={async (db) => setDatabase(db)}
                {...rest}
            > */}
                {children}
            {/* </SQLiteProvider> */}
        </SqliteDatabaseProviderContext.Provider>
    )
};