
import React from 'react';
import { createContext, useState } from "react";
import * as SQLite from 'expo-sqlite/legacy'
import type { SqliteDatabaseProviderContextProps, SqliteDatabaseProviderProps } from './interface';


export const SqliteDatabaseProviderContext = createContext<SqliteDatabaseProviderContextProps>({
    database: undefined,
    clearDatabase: () => new Promise(() => { }),
});

const SqliteDatabaseProvider: React.FC<SqliteDatabaseProviderProps> = ({
    defaultSourceFile = "app.testDb",
    source = SQLite.openDatabase(defaultSourceFile),
    children 
}) => {
    const [database, setDatabase] = useState(source);
    
    const clearDatabase = () => {
        return new Promise<boolean>((resolve, reject) => {
            database.closeAsync()
            database.deleteAsync().then(() => {
                setDatabase(SQLite.openDatabase(defaultSourceFile))
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }


    return (
        <SqliteDatabaseProviderContext.Provider value={{
            database,
            clearDatabase,
        }}>
            {children}
        </SqliteDatabaseProviderContext.Provider>
    )
}

export default SqliteDatabaseProvider;