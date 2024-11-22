"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define the Joke type
type Joke = {
    id: number;
    content: string;
};
function JokeMainScreen() {
    const [jokes, setJokes] = useState([]);
    const [randomJoke, setRandomJoke] = useState("");
    console.log("silly");
    // Fetch on component mount
    useEffect(() => {
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/jokes`) // Log the full URL
            .then((response) => {
                console.log("Fetched jokes:", response.data);
                setJokes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jokes", error);
            });
    }, []);
    // console.log(jokes);
    // random joke get
    const fetchRandomJoke = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/jokes/random`)
            .then((response) => {
                setRandomJoke(response.data);
            })
            .catch((error) => {
                console.error("Error fetching random joke", error);
            });
    };
    console.log(randomJoke);
    return (
        <div className="">
            <h1>Dad Jokes</h1>
            <button onClick={fetchRandomJoke}>Get a Random Joke</button>
            <p>{randomJoke.content}</p>

            <h2>All Jokes</h2>
            <ul>
                {jokes.map((joke, index) => (
                    <li key={index}>{joke.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default JokeMainScreen;
