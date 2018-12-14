import mongodb from 'mongodb';
import {promptPassword} from './prompt';

function extractDBName(db: string): { host: string, port: string, dbName: string } {
  let [prefix, suffix] = db.split('/');

  if (!suffix) {
    suffix = prefix;
    prefix = 'localhost:27017';
  }

  return {
    host: prefix.split(':')[0],
    port: prefix.split(':')[1],
    dbName: suffix
  };
}

export async function connect(dbParam: string, authParams?: {authDB: string, username: string, password?: string}): Promise<{ client: mongodb.MongoClient, db: mongodb.Db }> {
  const {host, port, dbName} = extractDBName(dbParam);
  const options: {auth? : {user: string, password: string}, authSource?: string, useNewUrlParser: boolean} = {useNewUrlParser: true};

  if (authParams) {
    options.auth = {
      user: authParams.username,
      password: authParams.password ? authParams.password : await promptPassword()
    };
    options.authSource = authParams.authDB;
  }

  const client = await mongodb.MongoClient.connect(`mongodb://${host}:${port}`, options);

  const db = client.db(dbName);
  return {
    client,
    db
  };
}