import * as SQLite from 'expo-sqlite/legacy'
import { error, success, type DBCallbackTypes } from './callbacks';
import { cmd } from './commands';

export class DORM<T = {}> {

    tableName!: string;
    selectQuery: string = "select * from";
    whereQuery: string = "where 1 = 1";
    whereVariables: (string | number | null)[] = [];
    joinQuery: string = "";
    orderQuery = "";
    limitQuery = "";
    fillables: string[] = []

    constructor(
        private _db: SQLite.SQLiteDatabase,
    ) {

    }

    limit(count: number) {
        this.limitQuery = `limit ${count}`;
        return this;
    }

    orderBy(key: string, order: "asc" | "desc" = "asc") {
        this.orderQuery = `order by ${key} ${order}`;
        return this;
    }

    table(tableName: string) {
        this.tableName = tableName;
        return this;
    }

    insert(values: Partial<T>, debug: boolean = false) {
        return new Promise<number | undefined>((resolve, reject) => {
            const fillableValues = this.getFillables(values, debug)
            // console.log(Object.keys(fillableValues), Object.keys(fillableValues).length)
            if (!(Object.keys(fillableValues).length)) {
                if (debug) console.log(fillableValues)
                throw new Error(`Fillable values not found!`);
            }

            const insertKeys = Object.entries(fillableValues).map(([key]) => (`${key}`)).join(', ');
            const insertValuesIdentifier = Object.values(fillableValues).map(() => (`?`)).join(',');
            const insertValues = Object.values(fillableValues).map((value) => value) as SQLite.SQLStatementArg[];

            const query = `${cmd.insert} ${this.tableName} (${insertKeys}) VALUES (${insertValuesIdentifier})`
            if (debug) console.log(query);

            this._db.transaction((txn) => {
                return txn.executeSql(query, insertValues,
                    (_stx, res) => {
                        if (debug) console.log(res);
                        resolve(res?.insertId)
                    },
                    (_etx, err) => {
                        if (debug) console.log(err);
                        reject(err)
                        return false
                    }
                )
            })
        })
    }

    update(values: Partial<T>, debug: boolean = false) {
        return new Promise<boolean | undefined>((resolve, reject) => {
            const fillableValues = this.getFillables(values, debug)
            if (!(Object.keys(fillableValues).length)) {
                if (debug) console.log(fillableValues)
                throw new Error(`Fillable values not found!`);
            }
            const insertKeys = Object.entries(fillableValues).map(([key]) => (`${key}=?`)).join(', ');
            const insertValues = Object.values(fillableValues).map((value) => value) as SQLite.SQLStatementArg[];

            const query = `${cmd.update} ${this.tableName} SET ${insertKeys} ${this.whereQuery}`
            if (debug) console.log(query, insertValues, this.whereVariables);

            this._db.transaction((txn) => {
                return txn.executeSql(query, [...insertValues, ...this.whereVariables],
                    (_stx, res) => {
                        if (debug) console.log(res);
                        resolve(res.rowsAffected ? true : false)
                    },
                    (_etx, err) => {
                        if (debug) console.log(err);
                        reject(err)
                        return false;
                    }
                )
            })
        })
    }

    delete(debug: boolean = false) {
        return new Promise<boolean | undefined>((resolve, reject) => {
            const query = `${cmd.delete} ${this.tableName} ${this.whereQuery}`
            if (debug) console.log(query, this.whereVariables);

            this._db.transaction((txn) => {
                return txn.executeSql(query, [...this.whereVariables],
                    (_stx, res) => {
                        if (debug) console.log(res);
                        resolve(res.rowsAffected ? true : false)
                    },
                    (_etx, err) => {
                        if (debug) console.log(err);
                        reject(err)
                        return false;
                    }
                )
            })
        })
    }

    join(table: string, condition: string, type: "inner" | "left" | "right" = "inner") {
        this.joinQuery = `${type} join ${table} on (${condition})`;
        return this;
    }

    select(conditions?: string) {
        this.selectQuery = `select ${conditions ?? "*"} from`;
        return this;
    }

    where(conditions: string, variables: (string | number | null)[] = []) {
        this.whereQuery = `where ${conditions}`;
        this.whereVariables = variables;
        return this;
    }

    get(callback?: DBCallbackTypes["default"], debug: boolean = false) {
        return new Promise<T[] | undefined>((resolve, reject) => {
            const query = `${this.selectQuery} ${this.tableName} ${this.joinQuery} ${this.whereQuery} ${this.orderQuery} ${this.limitQuery}`;
            if (debug) console.log(query);

            this._db.transaction((txn) => {
                return txn.executeSql(query, [...this.whereVariables],
                    (_stx, res) => {
                        if (debug) console.log(res);
                        success<T[]>(res.rows._array, callback)
                        resolve(res.rows._array)
                    },
                    (_etx, err) => {
                        if (debug) console.log(err);
                        reject(err)
                        return error<T>(err, callback)
                    }
                )
            })
        })
    }

    getFillables(values: Partial<T>, debug?: boolean) {
        let fillable = { ...values };
        // console.log(fillable, this.fillables)
        if (this.fillables.length) {
            Object.keys(values).forEach((key) => {
                if (!(this.fillables.includes(key))) {
                    // console.log(key)
                    // @ts-ignore
                    delete fillable[key];
                }
            })
        }
        if (debug) console.log("DEBUG: ", "Fillable Values>>> ", fillable);
        return fillable;
    }

}
