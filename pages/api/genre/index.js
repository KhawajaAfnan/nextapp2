import { getGenres } from '../../../data/movies.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const genres = await getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
}
