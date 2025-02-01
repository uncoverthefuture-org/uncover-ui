import * as SQLite from 'expo-sqlite';

export interface SqliteDatabaseProviderProps extends SQLite.SQLiteProviderProps {
    source?: SQLite.SQLiteDatabase; 
    children: React.ReactNode;
}

export interface SqliteDatabaseProviderContextProps {
    isLoading?: boolean;
    isClearing?: boolean;
    database?: SQLite.SQLiteDatabase,
    clearDatabase: () => Promise<boolean>,
}