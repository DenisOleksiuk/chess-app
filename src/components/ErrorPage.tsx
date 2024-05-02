import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

interface Error {
    statusText?: string;
    message?: string;
}

const ErrorPage: FC = () => {
    const error = useRouteError() as Error;

    return (
        <div className="flex flex-col gap-y-3">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Go back to the home page</Link>
        </div>
    );
};

export default ErrorPage;
