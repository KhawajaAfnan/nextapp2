import { getDirectorById, getMoviesByDirectorId } from "../../../data/movies";

export default async function handler(req, res) {
    const { id } = req.query;

    const director = await getDirectorById(id);

    if (!director) {
        return res.status(404).json({ message: "Director not found" });
    }

    const movies = await getMoviesByDirectorId(id);

    res.status(200).json({
        director,
        movies
    });
}
