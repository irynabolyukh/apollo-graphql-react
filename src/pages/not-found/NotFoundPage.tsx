import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/constants';

export const NotFoundPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <h1 style={{ fontSize: '72px', margin: '0 0 16px 0', color: '#333' }}>404</h1>
            <h2 style={{ fontSize: '24px', margin: '0 0 16px 0', color: '#666' }}>Page Not Found</h2>
            <p style={{ fontSize: '16px', margin: '0 0 24px 0', color: '#666' }}>
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to={PATHS.home}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#0366d6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                }}
            >
                Go to Home
            </Link>
        </div>
    );
};
