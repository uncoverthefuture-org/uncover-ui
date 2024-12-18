import * as SQLite from 'expo-sqlite/legacy';

export interface SqliteDatabaseProviderProps {
    source?: SQLite.SQLiteDatabase; 
    defaultSourceFile?: string;
    children: React.ReactNode;
}

export interface SqliteDatabaseProviderContextProps {
    isLoading?: boolean;
    isClearing?: boolean;
    database?: SQLite.SQLiteDatabase,
    clearDatabase: () => Promise<boolean>,
}