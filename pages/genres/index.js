import { getGenres } from '../../data/movies';
import { useRouter } from 'next/router';
import Link from 'next/link';
export async function getServerSideProps(){
    const genres = await getGenres();
    return {
        props: { genres },
    };
}

export default function GenresPage({ genres }) {
    return(
        <div>
            <h1> 
                Genres
                {genres.map((genre) => (
                    <li key={genre.id}>
                        <Link href={`/genres/${genre.id}`}><h2>{genre.name}</h2></Link>
                        <p>{genre.description}</p> 
                    </li>
                ))}
            </h1>
        </div>
    )
}