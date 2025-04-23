import React from 'react';
import { useRouter } from 'next/router';
import { getMoviesByGenre } from '../../../data/movies';
import Link from 'next/link';

export async function getServerSideProps(context) {
    const {id} = context.params;
    const movies= await getMoviesByGenre(id);
    return {
        props: { movies },
    };
}
export default function moviesBygenre({movies}){
    return(
        <div>
            <h1>Movies by Genre</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p> 
                        <p>Rating: {movie.rating}</p>
                        <Link href={`/movies/${movie.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}