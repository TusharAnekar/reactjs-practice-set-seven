//Create a component that displays a random quote from an API using the useEffect and useState hooks. The component should fetch a new quote when the user clicks a button.

import { useEffect, useState } from "react"
import { fakeFetchFive } from "../apis/fakeFetchFive"

export function Quote() {

    const [quote, setQuote] = useState({})

    async function getQuotes() {
        try {
            const randomQuote = await fakeFetchFive()
            setQuote(randomQuote)
        } catch (error) {
            
        }
    }

    useEffect(()=> {
        getQuotes()
    }, [])
    return(
        <>
            <h1>Quote</h1>
            {!quote.content && <p>Loading...</p>}
            {quote.content && 
                <div>
                    <p>{quote.content}</p>
                    <p>{quote.author}</p>
                </div>
            }
            <button onClick={getQuotes}>New Quote</button>
        </>
    )
}