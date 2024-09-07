import { SQLError } from "expo-sqlite/legacy";

export type ResultError = SQLError | null;


export interface DBNote {
    id: number;
    title: string;
    content: string;
    note_id: string;
    pushed_at: string;
    updated_at: string;
    created_at: string;
}

export interface DBBibleVersion {
    id: number;
    slug: string;
    name: string;
    data: string | any | null;
    description: string;
    size: string,
    status: number;
    default_version?: number;
    data_updated_at?: string;
    server_updated_at?: string;
    updated_at: string;
    created_at: string;
}