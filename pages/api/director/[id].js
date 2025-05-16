import { getDirectorById, getMoviesByDirectorId } from "../../../data/movies";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!id) {
    return res.status(400).json({ error: 'Director ID is required' });
  }

  try {
    const director = await getDirectorById(id);

    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }

    const movies = await getMoviesByDirectorId(id);

    return res.status(200).json({
      director,
      movies
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch director and movies' });
  }
}
