import React, { useMemo } from 'react';
import { SqliteDatabaseProviderContext } from '../providers/main';


export const useSqlite = () => {
    const context = React.useContext(SqliteDatabaseProviderContext);

    
    return useMemo(() => ({ 
        ...context 
    }), [context]);
}