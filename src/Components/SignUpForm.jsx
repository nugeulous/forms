/* eslint-disable react/prop-types */
import { useState } from 'react';
const API_URL = 'https://fsa-jwt-practice.herokuapp.com';

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [errorChars, setErrorChars] = useState(null);
    const [errorPw, setErrorPw] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const obj = {
                username:
                    username.length >= 8
                        ? username
                        : setErrorChars('Minimum 8 characters required.'),
                password:
                    password.includes(0) || password.includes(1)
                        ? password
                        : setErrorPw('Password must contain a 0 or 1.'),
            };

            const response = await fetch(API_URL + '/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    // Add any other headers if required
                },
                body: JSON.stringify(obj), // Convert the data to JSON format
            });
            const data = await response.json();
            console.log('data: ', data);
            setToken(data.token);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div>
                <h2>Sign Up</h2>
                {errorChars && <p>{errorChars}</p>}
                {errorPw && <p>{errorPw}</p>}
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} action="submit">
                    <label>
                        username:
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            name="username"
                            id=""
                        />
                    </label>
                    <br></br>
                    <label>
                        password:
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="text"
                            name="password"
                            id=""
                        />
                    </label>
                    <br></br>
                    <input type="submit" />
                </form>
            </div>
        </>
    );
}
