import clientPromise from './db.js';

export async function getTrendingMovies() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('movies').find({}).toArray();
}

export async function getGenres() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('genres').find({}).toArray();
}

export async function getMoviesByGenre(genreId) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('movies').find({ genreId }).toArray();
}

export async function getAllMovies() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('movies').find({}).toArray();
}

export async function getMovieById(movieId) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('movies').findOne({ id: movieId });
}

export async function getDirectorById(directorId) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('directors').findOne({ id: directorId });
}

export async function getMoviesByDirectorId(directorId) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'Assignment3');
  return await db.collection('movies').find({ directorId }).toArray();
}
