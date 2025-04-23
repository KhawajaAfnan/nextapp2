import Link from 'next/link';

export default function HelpIndex() {
  return (
    <div>
      <h1>Help Page</h1>
      <p>Welcome to the Help Center. Select a section below.</p>
      <ul>
        <li><Link href="/help/faqs">FAQs</Link></li>
        <li><Link href="/help/contact">Contact</Link></li>
        <li><Link href="/help/privacy">Privacy Policy</Link></li>
      </ul>
    </div>
  );
}
