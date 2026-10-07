import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="err-code">404</p>
          <h1 style={{ fontSize: 'clamp(26px, 3vw, 34px)', marginBottom: 12 }}>Page not found</h1>
          <p style={{ fontSize: 17, marginBottom: 28 }}>That page does not exist, or it has moved.</p>
          <div className="loc-acts" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn btn-g">Back to the homepage</Link>
            <Link href="/services/" className="btn btn-o">Browse services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
