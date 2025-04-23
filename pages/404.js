import Link from 'next/link';

export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link href="/">
                <button style={{ marginTop: '20px', padding: '10px 20px' }}>Go Home</button>
            </Link>
        </div>
    );
}
