import { useState } from "react";
const API__URL = 'https://fsa-jwt-practice.herokuapp.com';

// eslint-disable-next-line react/prop-types
export default function Authenticate( { token } ) {

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [dataUsername, setDataUsername] = useState(null);

    async function handleClick(){

        try {
            const response = await fetch(API__URL + '/authenticate', 
            { 
              method: "GET", 
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
              }
            });
            const data = await response.json();
            setSuccessMessage(data.message);
            setDataUsername(data.data.username);
            console.log('authenticate fetch: ', data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2 id="auth-section">Authenticate</h2>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            {dataUsername && <p>Welcome, {dataUsername}!</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    )
}