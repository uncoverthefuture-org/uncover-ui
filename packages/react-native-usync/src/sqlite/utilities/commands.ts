/**
 * @deprecated Use `queryCommands` instead. This will be removed in future versions.
 * Collection of SQLite command string constants used for database operations.
 * @remarks This object provides basic SQL command snippets and data type definitions for SQLite queries.
 */
/**
 * SQL command utilities for SQLite operations
 * @property {string} insert - "INSERT INTO" command for adding new records
 * @property {string} update - "UPDATE" command for modifying existing records
 * @property {string} create - "CREATE TABLE IF NOT EXISTS" command for safe table creation
 * @property {string} int - "INTEGER" data type declaration
 * @property {string} primary - "PRIMARY KEY AUTOINCREMENT" for auto-incrementing primary keys
 * @property {string} select - "SELECT" command for querying data
 * @property {string} selectAll - "SELECT * FROM" command for retrieving all columns
 * @property {string} delete - "DELETE FROM" command for removing records
 * @property {string} varchar - "TEXT" data type for variable character strings
 * @property {string} text - "TEXT" data type for standard text storage
 * @property {string} lText - "LONGTEXT" data type for large text content
 * @property {string} autoID - "INTEGER PRIMARY KEY AUTOINCREMENT" for auto-incrementing primary key columns
 * @property {string} date - "TIMESTAMP" data type for datetime values
 * @property {string} defaultNull - "DEFAULT NULL" constraint for nullable columns
 * @property {string} serverDate - Creates "server_updated_at TIMESTAMP DEFAULT NULL" column
 * @property {string} deleteDate - Creates "deleted_at TIMESTAMP DEFAULT NULL" column for soft deletes
 * @property {string} basicDate - Creates standard timestamp columns: "updated_at" and "created_at" with CURRENT_TIMESTAMP defaults
 */
export const cmd = {
    insert: "INSERT INTO",
    update: "UPDATE",
    create: "CREATE TABLE IF NOT EXISTS",
    int: "INTEGER",
    primary: "PRIMARY KEY AUTOINCREMENT",
    select: "SELECT",
    selectAll: "SELECT * FROM",
    delete: "DELETE FROM",
    varchar: "TEXT",
    text: "TEXT",
    lText: "LONGTEXT",
    autoID: "INTEGER PRIMARY KEY AUTOINCREMENT", 
    date: "TIMESTAMP",
    defaultNull: "DEFAULT NULL",
    serverDate: "server_updated_at TIMESTAMP DEFAULT NULL",
    deleteDate: "deleted_at TIMESTAMP DEFAULT NULL",
    basicDate: "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
}

export const queryCommands = cmd;