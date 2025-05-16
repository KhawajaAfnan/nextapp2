import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Use SSL for the connection (default behavior)
  // No need for sslValidate or tlsAllowInvalidCertificates for Atlas
};

console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("MONGODB_DB:", process.env.MONGODB_DB);

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const client = new MongoClient(uri, options);

// Create a singleton instance
let dbClient = null;

export async function getDbClient() {
  if (!dbClient) {
    dbClient = await client.connect();
  }
  return dbClient;
}

export async function getDb() {
  const client = await getDbClient();
  return client.db(process.env.MONGODB_DB || 'Assignment3');
}
