import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountDownTimer from "./CountDownTimer"; // Import the CountDownTimer component
import Question from "./Question";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { Link } from "react-router-dom";
import "./css/Home.css";
export var currNameID = "";
export var currQuestion = 0;

const Home = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const messageRef = useRef(null);

    const ref = collection(firestore, "names");

    const navigate = useNavigate();

    const startGameFlow = () => {
        // Start the game flow
        navigate("/question");
        setTimeout(() => {
            // Transition to the Scoreboard component after 10 seconds

            navigate("/scoreboard");
            setTimeout(() => {
                // Transition to the Question component after 5 seconds in Scoreboard component
                currQuestion = 1;
                navigate("/question");
                setTimeout(() => {
                    // Transition to the Scoreboard component after 10 seconds

                    navigate("/scoreboard");
                    setTimeout(() => {
                        // Transition to the Question component after 5 seconds in Scoreboard component
                        currQuestion = 2;

                        navigate("/question");
                        setTimeout(() => {
                            // Transition to the Leaderboard component after 10 seconds

                            // LEADERBOARD!
                            navigate("/leaderboard");
                        }, 10000);
                    }, 5000);
                    // 20 seconds in Question component
                }, 10000);
                // 10 seconds in Scoreboard component
            }, 5000);
            // 20 seconds in Question component
        }, 10000);
        // 20 seconds before starting the game
    };

    useEffect(() => {
        if (gameStarted) {
            // Start the game flow when gameStarted is true
            startGameFlow();
        }
    }, [gameStarted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            name: messageRef.current.value,
            score: 0,
        };

        try {
            const docRef = await addDoc(ref, data);
            currNameID = docRef.id;
        } catch (err) {
            console.log(err);
        }
        // if (gameStarted) {
        // Start the game flow when gameStarted is true
        startGameFlow();
        // }
        // navigate('/question');
    };

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(ref);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data()["name"], " => ", doc.data()["score"]);
                // Process each document here (e.g., update state with the fetched data)
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    return (
        <div className='Home'>
            <div className='probStatement'>Codehoot!</div>

            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <input type='text' className='username-input' placeholder='Nickname' ref={messageRef} />
                    <button className='startButton' type='submit'>
                        OK, let's code!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
