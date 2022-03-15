interface IDatabase {}

export class Database implements IDatabase {
    private databaseName = "";
    private version = 1;
    private db: IDBDatabase = {} as IDBDatabase;
    constructor(databaseName: string, version: number) {
        this.databaseName = databaseName;
        this.version = version;
        const request = indexedDB.open(this.databaseName, this.version);
        request.onerror = (event: any) => {
            console.error(event);
        };
        request.onsuccess = (event: any) => {
            this.db = event.target.result;
        };
        request.onupgradeneeded = (event: any) => {
            this.db = event.target.result;
            this.db.createObjectStore("data", {keyPath: "id"});
        };
    }

    /**
     * set
     */

    public createTable(tableName: string, keyPath = ""): void {
        const transaction = this.db.transaction([tableName], "readwrite");
        const store = transaction.objectStore(tableName);
        store.createIndex(tableName, keyPath);
    }

    public addToTable<T>(tableName: string, value: T): void {
        const transaction = this.db.transaction([tableName], "readwrite");
        const store = transaction.objectStore(tableName);
        const request = store.add(value);
        request.onsuccess = (event: any) => {
            console.log(event);
        };
        request.onerror = (event: any) => {
            console.error(event);
        };
    }

    public set<T>(tableName: string, key: string, value: T): void {
        const transaction = this.db.transaction([tableName], "readwrite");
        const store = transaction.objectStore(tableName);
        const request = store.put({id: key, value: value});
        request.onsuccess = (event: any) => {
            console.log(event);
        };
        request.onerror = (event: any) => {
            console.error(event);
        };
    }

    public get<T>(tableName: string, key: string): T {
        const transaction = this.db.transaction([tableName], "readwrite");
        const store = transaction.objectStore(tableName);
        const request = store.get(key);
        request.onsuccess = (event: any) => {
            console.log(event);
        };
        request.onerror = (event: any) => {
            console.error(event);
        };
        return request.result as T;
    }
}

const database = new Database("database", 1);

database.createTable("data", "id");
database.addToTable("data", {id: "1", value: "test"});
// database.set("data", "1", {id: "1", value: "test"});
console.log(database.get("data", "1"));
