import PlayButton from '@/components/PlayButton';
import { Link } from 'react-router-dom';

import './root.css';

export default function Root() {
    return (
        <div className="welcome grid gap-4 justify-items-center">
            <h1 className="title">Welcome to Chess Master</h1>
            <p className="subtitle">Get ready to challenge your chess skills!</p>
            <div className="button-container">
                <Link to="/game">
                    <PlayButton />
                </Link>
            </div>
        </div>
    );
}
