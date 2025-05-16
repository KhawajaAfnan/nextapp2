import { getDb } from '../../../data/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const genres = await db.collection("genres").find().toArray();

    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 