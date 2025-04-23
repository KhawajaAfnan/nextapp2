import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(),'data', 'movies.json');

export async function getTrendingMovies() {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const topMovies = data.movies.sort((a, b) => b.rating - a.rating).slice(0, 3);
    return topMovies; 

}

export async function getGenres() {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return data.genres;
}
export async function getMoviesByGenre(genreId) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const moviesByGenre = data.movies.filter(movie => movie.genreId === genreId);
    return moviesByGenre;
}
export async function getAllMovies() {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return data.movies;
}
export async function getMovieById(movieId) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const movie = data.movies.find(movie => movie.id === movieId);
    return movie;
}
export async function getDirectorById(directorId) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const director = data.directors.find(director => director.id === directorId);
    return director;
}