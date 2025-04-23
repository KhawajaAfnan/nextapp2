import { getTrendingMovies } from '../data/movies';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const result = await getTrendingMovies();

  return {
    props: { movies: result },
    revalidate: 60,
  };
}


export default function HomePage({ movies }) {
  const router = useRouter();

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
            <button onClick={() => router.push(`/movies/${movie.id}`)}>
              View Details
            </button>
            <button onClick={() => router.push(`/genres/${movie.genreId}`)}>
              View Genre
            </button> 
          </li>
        ))}
      </ul>
 
      <button onClick={() => router.push('/genres')}>
        Browse Genres
      </button>
      <button onClick={() => router.push('/movies')}>
        Browse All Movies
      </button>
    </div>
  );
}
