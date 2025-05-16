import { getDb } from '../../../data/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    
    const movies = await db.collection("movies")
      .find()
      .sort({ rating: -1 }) 
      .limit(3)           
      .toArray();
    
    console.log("Fetched top 3 trending movies:", movies);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
