    import useSWR from 'swr';
    import Link from 'next/link';
    import { useRouter } from 'next/router';

    const fetcher = (url) => fetch(url).then((res) => res.json());

    export default function DirectorPage() {
        const router = useRouter();
        const { id } = router.query;
        console.log('director id');

        console.log(id);

        const { data, error } = useSWR(id ? `/api/director/${id}` : null, fetcher);

        if (error) return <div>Failed to load</div>;
        if (!data) return <div>Loading...</div>;

        const { director, movies } = data;

        return (
            <div>
                <h1>Director</h1>
                <p><strong>Director Name:</strong> {director.name}</p>
                <p><strong>Biography:</strong> {director.biography}</p>

                <h2>Movies by {director.name}</h2>
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.description}</p>
                            <p>Rating: {movie.rating}</p>
                            <button onClick={() => router.push(`/movies/${movie.id}`)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>

                <Link href="/movies">Back to Movies</Link>
            </div>
        );
    }
