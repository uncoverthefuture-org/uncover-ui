import * as SQLite from 'expo-sqlite/legacy'
import { error, success, type DBCallbackTypes } from './callbacks';
import { cmd } from './commands';

export class DORM<T = any> {

    tableName!: string;
    selectQuery: string = "select * from";
    whereQuery: string = "where 1 = 1";
    whereVariables: (string|number|null)[] = [];
    joinQuery: string = "";
    orderQuery = "";
    limitQuery = "";


    constructor(
        private _db: SQLite.SQLiteDatabase,
    ) {

    }

    limit(count: number) {
        this.limitQuery = `limit ${count}`;
        return this;
    }

    orderBy(key: string, order: "asc"|"desc" = "asc") {
        this.orderQuery = `order by ${key} ${order}`;
        return this;
    }

    table(tableName: string) {
        this.tableName = tableName;
        return this;
    }

    insert(values: { [key: string]: string | number | null }, callback?: DBCallbackTypes["default"],  debug: boolean = false) {
        const insertKeys = Object.entries(values).map(([key]) => (`${key}`)).join(', ');
        const insertValuesIdentifier = Object.values(values).map(() => (`?`)).join(',');
        const insertValues = Object.values(values).map((value) => value);

        const query = `${cmd.insert} ${this.tableName} (${insertKeys}) VALUES (${insertValuesIdentifier})`
        if (debug) console.log(query);

        this._db.transaction((txn) => {
            return txn.executeSql(query, insertValues,
                (_stx, res) => {
                    if (debug) console.log(res);
                    success(res.insertId, callback)
                },
                (_etx, err) => {
                    if (debug) console.log(err);
                    return error(err, callback)
                }
            )
        })
    }

    update(values: { [key: string]: string | number | null }, callback?: DBCallbackTypes["default"], debug: boolean = false) {
        const insertKeys = Object.entries(values).map(([key]) => (`${key}=?`)).join(', ');
        const insertValues = Object.values(values).map((value) => value);

        const query = `${cmd.update} ${this.tableName} SET ${insertKeys} ${this.whereQuery}`
        if (debug) console.log(query);

        this._db.transaction((txn) => {
            return txn.executeSql(query, [...insertValues, ...this.whereVariables],
                (_stx, res) => {
                    if (debug) console.log(res);
                    success(res.rowsAffected ? true : false, callback)
                },
                (_etx, err) => {
                    if (debug) console.log(err);
                    return error(err, callback)
                }
            )
        })
    }

    delete(callback?: DBCallbackTypes["default"], debug: boolean = false) {
        const query = `${cmd.delete} ${this.tableName} WHERE ${this.whereQuery}`
        if (debug) console.log(query);

        this._db.transaction((txn) => {
            return txn.executeSql(query, [...this.whereVariables],
                (_stx, res) => {
                    if (debug) console.log(res);
                    success(res.rowsAffected ? true : false, callback)
                },
                (_etx, err) => {
                    if (debug) console.log(err);
                    return error(err, callback)
                }
            )
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

    where(conditions: string, variables: (string|number|null)[] = []) {
        this.whereQuery = `where ${conditions}`;
        this.whereVariables = variables;
        return this;
    }

    get(callback?: DBCallbackTypes["default"], debug: boolean = false) {
        const query = `${this.selectQuery} ${this.tableName} ${this.joinQuery} ${this.whereQuery} ${this.orderQuery} ${this.limitQuery}`;
        if (debug) console.log(query);

        this._db.transaction((txn) => {
            return txn.executeSql(query, [...this.whereVariables],
                (_stx, res) => {
                    if (debug) console.log(res);
                    success<T[]>(res.rows._array, callback)
                },
                (_etx, err) => {
                    if (debug) console.log(err);
                    return error<T>(err, callback)
                }
            )
        })

    }

}
