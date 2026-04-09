import { useState, useEffect } from 'react'
import { checkUrlDebounced } from './url-check';

import type { CheckURLResult } from '@shared/types';

import './App.css'

function App() {
  const [url, setUrl] = useState('');
  const [urlValidationResult, setUrlValidationResult] = useState<CheckURLResult | undefined>(undefined);

  useEffect(() => {
    if (!url) {
      setUrlValidationResult(undefined);

      return;
    };

    checkUrlDebounced(url)
    .then(result => {
      setUrlValidationResult(result);
    });
  }, [url]);

  return (
    <>
      <section id="center">
        <div>
          <h1>URL Checker</h1>
        </div>
        {urlValidationResult && <span>{urlValidationResult.message} {urlValidationResult.type && `| Type: ${urlValidationResult.type}`}</span>}
        <input onChange={(event) => setUrl(event.target.value)}
        />
      </section>
    </>
  )
}

export default App
