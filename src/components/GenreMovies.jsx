import { useEffect, useState } from "react"
import { fakeFetchSix } from "../apis/fakeFetchSix"

export function GenreMovies() {

    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [error, setError] = useState({})

    async function getMovies() {
        try {
            const { status, data } = await fakeFetchSix('https://example.com/api/movies')
            setError({})
            if (status === 200)
                setMovies(data)
        } catch (error) {
            setError(error)
            filteredMovies([])
        }
    }

    useEffect(()=> {
        getMovies()
    }, [])

    function handleSelector(event) {
        if (event.target.value === "All") {
            console.log(movies)
            setFilteredMovies(movies)
        }
        else
            setFilteredMovies(movies.filter(({ genre }) => genre === event.target.value))
    }

    return (
        <>
            <h1>Genre Movies</h1>
            <label htmlFor="movie-selector">Filter by genre: </label>
            <select id="movie-selector" onChange={handleSelector}>
                <option value="All">All</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Science Fiction">Science Fiction</option>
            </select>

            <ul>
                {
                    !filteredMovies.length &&
                    movies.map(({ title, year, genre }) =>
                        <li style={{borderBottom: "1px solid red"}}>
                            <p>{title}</p>
                            <p>{year}</p>
                            <p>{genre}</p>
                        </li>
                    )
                }
            </ul>

            {error.status && <p>{error.message}</p>}

            <ul>
                {
                    filteredMovies.map(({ title, year, genre }) =>
                        <li style={{borderBottom: "1px solid grey"}}>
                            <p>{title}</p>
                            <p>{year}</p>
                            <p>{genre}</p>
                        </li>
                    )
                }
            </ul>
        </>
    )
}