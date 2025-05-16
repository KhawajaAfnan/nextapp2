import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB Atlas without deprecated options
    const client = await MongoClient.connect(
      "mongodb+srv://p4ths:lahore123@cluster0.wjaekvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db("Assignment3");
    
    // Get movies, sort by rating in descending order, and limit to top 3
    const movies = await db.collection("movies")
      .find()
      .sort({ rating: -1 }) // Sort by rating in descending order
      .limit(3)            // Get only top 3
      .toArray();
    
    console.log("Fetched top 3 trending movies:", movies);

    await client.close(); // Close the connection

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
