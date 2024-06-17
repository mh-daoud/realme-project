import {Db, MongoClient} from 'mongodb'

let db : Db 

export const dbClient = {
    connectToDB: (connectionString: string,callback: (error: any | null) => void) => {
        MongoClient.connect(connectionString)
        .then((client)  => {
            db = client.db()
            callback(null)
        })
        .catch((error) => callback(error))
    },
    getDb: () => db
}


export default dbClient