import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemJsDemo } from './demo/systemjs';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <SystemJsDemo />
    </React.StrictMode>,
  );
}
