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

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
