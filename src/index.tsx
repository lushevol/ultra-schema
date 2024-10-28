import React from 'react';
import ReactDOM from 'react-dom/client';
// import { worker } from './database';
import { Demo } from './demo';

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
// worker.start({ quiet: true }).then(() => {
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
