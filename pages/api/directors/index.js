import { getDb } from '../../../data/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const directors = await db.collection("directors").find().toArray();

    res.status(200).json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 