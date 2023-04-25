//Create a React component that fetches a list of movies from an API endpoint using useEffect hook and displays the title, year, and rating of each movie on the screen using the useState hook. Add a dropdown which filters the movies by year. You can keep 5 dropdown values - 2005 to 2010.

import { useEffect, useState } from "react"
import { fakeFetchThree } from "../apis/fakeFetchThree"

export function Movies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState({})
    const [filterdMovies, setFilteredMovies] = useState([])

    async function getData() {
        try {
            const { status, data } = await fakeFetchThree('https://example.com/api/movies')
            setError({})
            if (status === 200)
                setMovies(data)
        } catch (error) {
            setError(error)
            setFilteredMovies([])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleYearChange(event) {
        //setSelectedYear(event.target.value)

        if (event.target.value === "All") {
            setFilteredMovies(movies)
        }
        else {
            setFilteredMovies(movies.filter(({ year }) => year === Number(event.target.value)))
        }
    }

    return (
        <>
            <h1>Movies</h1>
            <label htmlFor="movie-selector">Filter by year: </label>
            <select id="movie-selector" onChange={handleYearChange}>
                <option value="select">Select</option>
                <option value="All">All</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
            </select>

            {error.status && <p>{error.message}</p>}

            {
                filterdMovies.map(({ title, year, rating }) =>
                    <div>
                        <h3>{title}</h3>
                        <p>Year: {year}</p>
                        <p>Rating: {rating}</p>
                    </div>)
            }
            {
                !movies.length && !error.status ? <p>Loading...</p> :
                !filterdMovies.length && !error.status && <p>No movies exist for the selected year.</p>
            }
        </>
    )
}

//value={selectedYear} !(selectedYear === "select") && <option value="select">Select</option>