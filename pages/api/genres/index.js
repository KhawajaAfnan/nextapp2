import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB Atlas
    const client = await MongoClient.connect(
      "mongodb+srv://p4ths:lahore123@cluster0.wjaekvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db("Assignment3");
    const genres = await db.collection("genres").find().toArray();
    
    await client.close();

    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 