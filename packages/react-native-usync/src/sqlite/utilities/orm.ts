import * as SQLite from 'expo-sqlite'
import { error, success, type DBCallbackTypes } from './callbacks';
import { queryCommands } from './commands';
import type { DBCreateAdditionalConfig } from './interface';

/**
 * Database Object Relational Mapping (DORM) class for SQLite operations
 * @template T - Type of the database model/entity
 * 
 * @class DORM
 * @description A simple ORM implementation for SQLite database operations in TypeScript
 * 
 * @property {string} tableName - Name of the database table
 * @property {string} selectQuery - SQL select query string
 * @property {string} whereQuery - SQL where clause string
 * @property {SQLite.SQLiteVariadicBindParams} whereVariables - Variables for the where clause
 * @property {string} joinQuery - SQL join clause string
 * @property {string} orderQuery - SQL order by clause string
 * @property {string} limitQuery - SQL limit clause string
 * @property {string[]} fillables - Array of fillable column names
 * @property {boolean} isInDebug - Debug mode flag
 * 
 * @example
 * const db = new DORM<UserModel>(sqliteDatabase);
 * db.table('users')
 *   .where('age > ?', [18])
 *   .get();
 * 
 * @example
 * const db = new DORM<UserModel>(sqliteDatabase);
 * db.table('users')
 *   .insert({
 *     name: 'John',
 *     age: 25
 *   });
 */

export class DORM<T = {}> {

    tableName!: string;
    selectQuery: string = "select * from";
    whereQuery: string = "where 1 = 1";
    whereVariables: SQLite.SQLiteVariadicBindParams = [];
    joinQuery: string = "";
    orderQuery = "";
    limitQuery = "";
    fillables: string[] = [];
    isInDebug: boolean = false;

    constructor(
        private _db: SQLite.SQLiteDatabase,
    ) {

    }


    /**
     * Enable or disable debug mode for database operations.
     * @param allow - Whether to enable debug mode. Defaults to true.
     * @returns The current instance for method chaining.
     */
    debug(allow: boolean = true) {
        this.isInDebug = allow;
        return this;
    }


    /**
     * Sets a LIMIT clause in the SQL query to restrict the number of rows returned.
     * @param count - The maximum number of rows to return.
     * @returns The current query builder instance for method chaining.
     */
    limit(count: number) {
        this.limitQuery = `limit ${count}`;
        return this;
    }


    /**
     * Sets the ORDER BY clause for the SQL query.
     * @param key - The column name to order by
     * @param order - The sort order ("asc" for ascending or "desc" for descending). Defaults to "asc"
     * @returns The current query builder instance for method chaining
     */
    orderBy(key: string, order: "asc" | "desc" = "asc") {
        this.orderQuery = `order by ${key} ${order}`;
        return this;
    }


    /**
     * Sets the table name for database operations.
     * @param tableName - The name of the database table to operate on.
     * @returns The current instance for method chaining.
     */
    table(tableName: string) {
        this.tableName = tableName;
        return this;
    }

    /**
     * Creates a new record in the specified table with the given configuration
     * 
     * @param config - An object containing column-value pairs where values are SQL data types
     *                (can be obtained from queryCommands, e.g., queryCommands.text)
     * @param extraConfig - Optional configuration of type {@link DBCreateAdditionalConfig}
     *                     Defaults to { hasTimeStamps: true, hasDeletedTimestamp: true }
     * 
     * @see {@link DBCreateAdditionalConfig} for create method configuration options
     * @see {@link queryCommands} for SQL data type definitions used in create method
     * 
     * @returns Promise that resolves with the ID of the newly created record or undefined if creation fails
     * 
     * @example
     * ```typescript
     * create({
     *   name: queryCommands.text,
     *   age: queryCommands.integer
     * })
     * ```
     */
    create(config: { [x: string]: string }, extraConfig: DBCreateAdditionalConfig = {
        hasTimeStamps: true, hasDeletedTimestamp: true,
    }) {
        return new Promise<number | undefined>((resolve, reject) => {
            const insertConfig = Object.entries(config).map(([key, value]) => {
                if (extraConfig.hasTimeStamps && (['updated_at', 'created_at']).includes(key)) return '';
                if (extraConfig.hasDeletedTimestamp && key == 'deleted_at') return '';
                return (`${key} ${value}`);
            }).join(', ');

            if (extraConfig.hasTimeStamps) insertConfig.concat(`, ${queryCommands.basicDate}`)
            if (extraConfig.hasDeletedTimestamp) insertConfig.concat(`, ${queryCommands.deleteDate}`)

            const query = `${queryCommands.create} ${this.tableName} (${insertConfig}) `
            if (this.isInDebug) console.log(query);

            this._db.withExclusiveTransactionAsync(async (txn) => {
                txn.runAsync(query).then((res) => {
                    if (this.isInDebug) console.log(res);
                    resolve(res?.changes)
                }, (err) => {
                    if (this.isInDebug) console.log(err);
                    reject(err)
                    return false
                });
            })
        })
    }

    insert(values: Partial<T>,) {
        return new Promise<number | undefined>((resolve, reject) => {
            const fillableValues = this.getFillables(values)
            // console.log(Object.keys(fillableValues), Object.keys(fillableValues).length)
            if (!(Object.keys(fillableValues).length)) {
                if (this.isInDebug) console.log(fillableValues)
                throw new Error(`Fillable values not found!`);
            }

            const insertKeys = Object.entries(fillableValues).map(([key]) => (`${key}`)).join(', ');
            const insertValuesIdentifier = Object.values(fillableValues).map(() => (`?`)).join(',');
            const insertValues = Object.values(fillableValues).map((value) => value) as SQLite.SQLiteBindParams;

            const query = `${queryCommands.insert} ${this.tableName} (${insertKeys}) VALUES (${insertValuesIdentifier})`
            if (this.isInDebug) console.log(query);

            this._db.withExclusiveTransactionAsync(async (txn) => {
                txn.runAsync(query, insertValues).then((res) => {
                    if (this.isInDebug) console.log(res);
                    resolve(res?.lastInsertRowId)
                }, (err) => {
                    if (this.isInDebug) console.log(err);
                    reject(err)
                    return false
                });
            })
        })
    }

    /**
     * Updates the database record with the provided values.
     *
     * @param values - A partial object containing the values to update.
     * @returns A promise that resolves to a boolean indicating whether the update was successful,
     *          or undefined if an error occurred.
     *
     * @throws Will throw an error if no fillable values are found.
     *
     * The method constructs an SQL update query using the provided values and executes it within
     * an exclusive transaction. If the update is successful, the promise resolves to `true`, otherwise `false`.
     * If an error occurs during the transaction, the promise is rejected with the error.
     *
     * Debugging information is logged to the console if `isInDebug` is set to `true`.
     */
    update(values: Partial<T>,) {
        return new Promise<boolean | undefined>((resolve, reject) => {
            const fillableValues = this.getFillables(values)
            if (!(Object.keys(fillableValues).length)) {
                if (this.isInDebug) console.log(fillableValues)
                throw new Error(`Fillable values not found!`);
            }
            const insertKeys = Object.entries(fillableValues).map(([key]) => (`${key}=?`)).join(', ');
            const insertValues = Object.values(fillableValues).map((value) => value) as SQLite.SQLiteVariadicBindParams;

            const query = `${queryCommands.update} ${this.tableName} SET ${insertKeys} ${this.whereQuery}`
            if (this.isInDebug) console.log(query, insertValues, this.whereVariables);

            this._db.withExclusiveTransactionAsync(async (txn) => {
                txn.runAsync(query, [...insertValues, ...this.whereVariables]).then((res) => {
                    if (this.isInDebug) console.log(res);
                    resolve(res.changes ? true : false)
                }, (err) => {
                    if (this.isInDebug) console.log(err);
                    reject(err)
                    return false;
                })
            })
        })
    }

    /**
     * Deletes records from the table based on the current where conditions.
     * Executes the delete operation within an exclusive transaction.
     * 
     * @returns A Promise that resolves to:
     *          - true if records were deleted
     *          - false if no records were deleted
     *          - undefined in case of error
     * @throws Will reject the promise with an error if the delete operation fails
     */
    delete() {
        return new Promise<boolean | undefined>((resolve, reject) => {
            const query = `${queryCommands.delete} ${this.tableName} ${this.whereQuery}`
            if (this.isInDebug) console.log(query, this.whereVariables);

            this._db.withExclusiveTransactionAsync(async (txn) => {
                txn.runAsync(query, this.whereVariables).then((res) => {
                    if (this.isInDebug) console.log(res);
                    resolve(res.changes ? true : false)
                }, (err) => {
                    if (this.isInDebug) console.log(err);
                    reject(err)
                    return false;
                })
            })
        })
    }

    /**
     * Creates a SQL JOIN clause with the specified table and condition.
     * @param table - The name of the table to join with.
     * @param condition - The join condition (ON clause).
     * @param type - The type of join to perform. Can be "inner", "left", or "right". Defaults to "inner".
     * @returns The current query builder instance for method chaining.
     */
    join(table: string, condition: string, type: "inner" | "left" | "right" = "inner") {
        this.joinQuery = `${type} join ${table} on (${condition})`;
        return this;
    }

    /**
     * Adds a SELECT clause to the SQL query
     * @param conditions - Optional string specifying the columns to select. If omitted, selects all columns (*)
     * @returns The current query builder instance for method chaining
     * @example
     * // Select all columns
     * query.select()
     * 
     * // Select specific columns
     * query.select("id, name, email")
     */
    select(conditions?: string) {
        this.selectQuery = `select ${conditions ?? "*"} from`;
        return this;
    }

    /**
     * Sets the WHERE clause for the SQL query
     * @param conditions - The SQL WHERE clause conditions as a string (e.g. "column = ? AND other_column = ?")
     * @param variables - Array of values to bind to the parameterized query. Can contain strings, numbers or null
     * @returns The current query builder instance for method chaining
     */
    where(conditions: string, variables: (string | number | null)[] = []) {
        this.whereQuery = `where ${conditions}`;
        this.whereVariables = variables as SQLite.SQLiteVariadicBindParams;
        return this;
    }

    get(callback?: DBCallbackTypes["default"],) {
        return new Promise<T[] | undefined>((resolve, reject) => {
            const query = `${this.selectQuery} ${this.tableName} ${this.joinQuery} ${this.whereQuery} ${this.orderQuery} ${this.limitQuery}`;
            if (this.isInDebug) console.log(query);

            this._db.withExclusiveTransactionAsync(async (txn) => {
                txn.getAllAsync<T>(query, this.whereVariables).then((res) => {
                    if (this.isInDebug) console.log(res);
                    success<T[]>(res, callback)
                    resolve(res)
                }, (err) => {
                    if (this.isInDebug) console.log(err);
                    reject(err)
                    return error<T>(err, callback)
                })
            })
        })
    }

    /**
     * Filters an object to only include properties that are defined as fillable.
     * 
     * @param values - Partial object containing properties to be filtered
     * @returns An object containing only the properties that are included in the fillables array
     * 
     * @example
     * // If fillables = ['name', 'email']
     * getFillables({ name: 'John', email: 'john@example.com', id: 1 })
     * // Returns { name: 'John', email: 'john@example.com' }
     */
    getFillables(values: Partial<T>) {
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
        if (this.isInDebug) console.log("DEBUG: ", "Fillable Values>>> ", fillable);
        return fillable;
    }

}
