import { useRouter } from 'next/router';
import Link from 'next/link';

export default function HelpPage() {
    const router = useRouter();
    const { slug } = router.query;

    let content;

    
    if (!slug || slug.length === 0) {
        content = <p>Welcome to the Help Center. Select a section above.</p>;
    } else if (slug[0] === 'faqs') {
        content = <p>Here are some frequently asked questions...</p>;
    } else if (slug[0] === 'contact') {
        content = <p>Contact us at support@example.com</p>;
    } else if (slug[0] === 'privacy') {
        content = <p>Read our privacy policy here...</p>;
    } else {
        content = <p>Help section not found.</p>
    }

    return (
        <div>
            <h1>Help Page</h1>
            {content}
            <ul>
                <li><Link href="/help/faqs">FAQs</Link></li>
                <li><Link href="/help/contact">Contact</Link></li>
                <li><Link href="/help/privacy">Privacy Policy</Link></li>
            </ul>
        </div>
    );
}
