import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap hero">
      <h1>That page isn’t here.</h1>
      <p>The link may be old, or the week may have moved.</p>
      <Link className="btn primary" href="/">
        Go to Discover
      </Link>
    </section>
  );
}
