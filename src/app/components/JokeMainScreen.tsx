"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function JokeMainScreen() {
    const [jokes, setJokes] = useState([]);
    const [randomJoke, setRandomJoke] = useState("");

    // Fetch on component mount
    useEffect(() => {
        axios
            .get("${process.env.NEXT_PUBLIC_API_URL/api/jokes")
            .then((response) => {
                setJokes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jokes", error);
            });
    }, []);

    // random joke get
    const fetchRandomJoke = () => {
        axios
            .get("${process.env.NEXT_PUBLIC_API_URL}/jokes/random")
            .then((response) => {
                setRandomJoke(response.data);
            })
            .catch((error) => {
                console.error("Error fetching random joke", error);
            });
    };

    return (
        <div className="">
            <h1>Dad Jokes</h1>
            <button onClick={fetchRandomJoke}>Get a Random Joke</button>
            <p>{randomJoke}</p>

            <h2>All Jokes</h2>
            <ul>
                {jokes.map((joke, index) => (
                    <li key={index}>{joke}</li>
                ))}
            </ul>
        </div>
    );
}

export default JokeMainScreen;
