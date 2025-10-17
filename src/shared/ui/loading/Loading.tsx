interface LoadingProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

export const Loading = ({ message = 'Loading...', size = 'medium' }: LoadingProps) => {
    const sizeMap = {
        small: { spinner: 24, fontSize: 12 },
        medium: { spinner: 48, fontSize: 14 },
        large: { spinner: 64, fontSize: 16 },
    };

    const { spinner, fontSize } = sizeMap[size];

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <div>
                <div
                    style={{
                        width: `${spinner}px`,
                        height: `${spinner}px`,
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #0366d6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 12px',
                    }}
                />
                {message && (
                    <p style={{ color: '#666', fontSize: `${fontSize}px`, margin: 0 }}>
                        {message}
                    </p>
                )}
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

