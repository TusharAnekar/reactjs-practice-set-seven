import { useEffect, useState } from "react"
import { fakeFetchTwo } from "../apis/fakeFetchTwo"

//Create a React component that fetches user data from an API endpoint using useEffect hook and displays the user's name, email, and phone number on the screen using the useState hook. Add a button which toggles the display of the user's address (street, suite, city, zipcode).
export function User() {

    const [userData, setUserData] = useState({})
    const [hideAddress, setHideAddress] = useState(true)
    //const [apiError, setApiError] = useState({})

    async function getData() {
        try {
            const { status, data } = await fakeFetchTwo('https://example.com/api/user')
            if (status === 200)
                setUserData(data)
        } catch (error) {
            setUserData(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <h1>User Details:</h1>
            {!userData.name && !userData.status && <p>Loading...</p>}
            {userData.status && <p>{userData.message}</p>}
            {userData.name &&
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone: {userData.phone}</p>
                    <button onClick={() => setHideAddress((hideAddress) => !hideAddress)}>{hideAddress ? "Show" : "Hide"} Address</button>
                    {!hideAddress &&
                        <div>
                            <p>{userData.address.street}</p>
                            <p>{userData.address.suite}</p>
                            <p>{userData.address.city}</p>
                            <p>{userData.address.zipcode}</p>
                        </div>
                    }
                </div>
            }
        </>
    )
}