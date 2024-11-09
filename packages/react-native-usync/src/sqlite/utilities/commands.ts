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