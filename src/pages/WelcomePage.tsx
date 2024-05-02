import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const WelcomePage: React.FC = () => {
    return (
        <div className="welcome">
            <h1>Welcome to Chess Master</h1>
            <p>Get ready to challenge your chess skills!</p>
            <div>
                <Link to="/game">
                    <button>Start New Game</button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;
