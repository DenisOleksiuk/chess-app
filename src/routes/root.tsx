import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export default function Root() {
    return (
        <div className="welcome grid gap-4 justify-items-center">
            <h1>Welcome to Chess Master</h1>
            <p>Get ready to challenge your chess skills!</p>
            <div>
                <Link to="/game">
                    <button>Start New Game</button>
                </Link>
            </div>
        </div>
    );
}
