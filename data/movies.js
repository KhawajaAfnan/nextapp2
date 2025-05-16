import { getDb } from './db.js';

export async function getTrendingMovies() {
  const db = await getDb();
  return await db.collection('movies').find({}).toArray();
}

export async function getGenres() {
  const db = await getDb();
  return await db.collection('genres').find({}).toArray();
}

export async function getMoviesByGenre(genreId) {
  const db = await getDb();
  return await db.collection('movies').find({ genreId }).toArray();
}

export async function getAllMovies() {
  const db = await getDb();
  return await db.collection('movies').find({}).toArray();
}

export async function getMovieById(movieId) {
  const db = await getDb();
  return await db.collection('movies').findOne({ id: movieId });
}

export async function getDirectorById(directorId) {
  const db = await getDb();
  return await db.collection('directors').findOne({ id: directorId });
}

export async function getMoviesByDirectorId(directorId) {
  const db = await getDb();
  return await db.collection('movies').find({ directorId }).toArray();
}
