import React, { useMemo } from 'react';
import { SqliteDatabaseProviderContext } from '../providers/main';
import { useSQLiteContext } from 'expo-sqlite';


export const useSqlite = () => {
    const context = React.useContext(SqliteDatabaseProviderContext);
    const database = useSQLiteContext();

    return useMemo(() => ({
        ...context,
        database,
    }), [context, database,]);
}