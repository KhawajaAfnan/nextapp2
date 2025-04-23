import React from 'react';
import { useRouter } from 'next/router';
import { getAllMovies } from '../../data/movies';

export async function getStaticProps(){
    const movies= await getAllMovies();
    return {
        props: { movies },
    };
}
export default function MoviesPage({movies}){
    const router = useRouter();
    return(
        <div>
            <h1>All Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p> 
                        <p>Rating: {movie.rating}</p>
                        <button onClick={() => router.push(`/movies/${movie.id}`)}>
                            View Details
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}