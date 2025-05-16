import { getMoviesByGenre } from '../../../data/movies.js';

export default async function handler(req, res) {
  const { genreId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!genreId) {
    return res.status(400).json({ error: 'genreId is required' });
  }

  try {
    const movies = await getMoviesByGenre(genreId);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
}
