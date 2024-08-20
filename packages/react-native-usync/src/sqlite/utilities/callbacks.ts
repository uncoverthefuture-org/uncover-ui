import type { ResultError } from "./interface";

export interface DBCallbackTypes<T extends any = any> {
    default: (data: T, error: ResultError) => void
}


export const success = <T extends any>(
    data: T,
    callback?: (data: T, error: ResultError) => void
) => {
    if (!callback) {
        return;
    }
    callback(data, null);
};

export const error = <T extends any>(
    err: ResultError,
    callback?: (data: T|null, err: ResultError) => void
) => {
    if (!callback) {
        return false;
    }
    callback(null, err);
    return true;
};