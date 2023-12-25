import { useEffect } from "react";
import { useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random"

function QuoteFetcher() {
    const [quote, setQuote] = useState({text : "", author : ""});
    
    // useEffect(()=> {
    //     async function getInitialQuote() {
    //         const response = await fetch(RANDOM_QUOTE_URL);
    //         const jsonResponse = await response.json();
    //         const randomQuote = jsonResponse.quote;
    //         setQuote(randomQuote);
    //     }
    //     getInitialQuote();  
    // }, []);

    useEffect(() => {
        fetchQuote();
    }, []);


    async function fetchQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote);
    }

    return (
        <div>
            <button onClick={fetchQuote}>URL 결과 가져오기</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}

export default QuoteFetcher;