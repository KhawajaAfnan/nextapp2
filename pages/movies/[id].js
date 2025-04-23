import { getMovieById } from "../../data/movies";
import { getDirectorById } from "../../data/movies";
import Link from "next/link";
import { useRouter } from "next/router";    


export async function getStaticProps(context) {
    const id= context.params.id;    
    const data=await getMovieById(id);
    if (!data || data.length === 0) {
        return {
          notFound: true,
        };
      }
    const director= await getDirectorById(data.directorId);
    data.director=director;
    //console.log(director);
    
    return {
        props: { movie: data },
        revalidate: 60,
    };
}
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}
export default function MovieDetailsPage({ movie }) {
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
            <p>Release Year: {movie.releaseYear}</p>
            <Link href={`/movies/director/${movie.director.id}`}><p>Director: {movie.director.name}</p></Link>
        </div>
    );
}