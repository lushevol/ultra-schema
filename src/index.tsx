import React from 'react';
import ReactDOM from 'react-dom/client';
import { Demo } from './demo';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./database/mock/msw');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
// enableMocking().then(() => {
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>,
  );
}
// });
