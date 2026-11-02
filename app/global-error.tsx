'use client';

const GlobalError = ({ reset }: { reset: () => void }) => (
  <html lang="en">
    <body>
      <main
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '100dvh',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        <div>
          <h1>Something went wrong</h1>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </div>
      </main>
    </body>
  </html>
);

export default GlobalError;
