import { Db, MongoClient } from "mongodb";

class DBConnection {

    static Instance: DBConnection;
    private connection: MongoClient;
    private dbName: string;
    public db?: Db;
    
    private constructor(connectionString: string, dbName: string) {
        this.connection = new MongoClient(connectionString);
        this.dbName = dbName;
    }

    private async init(): Promise<void> {
        await this.connection.connect();
        this.db = await this.connection?.db(this.dbName);
    }

    public close (): void {
        this.connection?.close();
    }    

    public static async initialize(connectionString: string, dbName: string) : Promise<void> {
        DBConnection.Instance = new DBConnection(connectionString, dbName);
        await DBConnection.Instance.init();
    }

    public static getInstance() : DBConnection {
        return DBConnection.Instance;
    }

}

export default DBConnection;