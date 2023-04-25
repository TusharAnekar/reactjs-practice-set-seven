import { useEffect, useState } from "react"
import { fakeFetchFour } from "../apis/fakeFetchFour"

export function Company() {

    const [users, setUsers] = useState([])
    const [error, setError] = useState({})
    const [filteredUsers, setFilteredUsers] = useState([])

    async function getUserDetails() {
        try {
            const { status, data } = await fakeFetchFour('https://example.com/api/users')
            setError({})
            if (status === 200)
                setUsers(data)
        } catch (error) {
            setError(error)
            setFilteredUsers([])
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    function handleCompanySelector(event) {
        if (event.target.value === "All")
            setFilteredUsers(users)
        else
            setFilteredUsers(users.filter(({ company }) => company === event.target.value))
    }

    return (
        <>
            <h1>Users</h1>
            <label htmlFor="company-selector">Filter by company: </label>
            <select id="company-selector" onChange={handleCompanySelector}>
                <option value="select">Select</option>
                <option value="All">All</option>
                <option value="ABC Inc">ABC Inc</option>
                <option value="XYZ Corp">XYZ Corp</option>
                <option value="ACME Corp">ACME Corp</option>
            </select>

            {!users.length && !error.status && <p>Loading...</p>}
            {error.status && <p>{error.message}</p>}

            <ul>
                {
                    filteredUsers.map(({ name, email, webiste, company }) => <li style={{borderBottom: "1px solid grey"}}>
                        <p>{name}</p>
                        <p>{email}</p>
                        <p>{webiste}</p>
                        <p>{company}</p>
                    </li>)
                }
            </ul>
        </>
    )
}