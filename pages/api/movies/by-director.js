import { getMoviesByDirectorId } from '../../../data/movies.js';

export default async function handler(req, res) {
  const { directorId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!directorId) {
    return res.status(400).json({ error: 'directorId is required' });
  }

  try {
    const movies = await getMoviesByDirectorId(directorId);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by director' });
  }
}
