import { useState, useEffect } from 'react'
import { checkUrlDebounced } from './utils';

import type { CheckURLResult } from '@shared/types';

export function UrlCheckInput() {
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
        {urlValidationResult && <span>{urlValidationResult.message} {urlValidationResult.type && `| Type: ${urlValidationResult.type}`}</span>}
        <input onChange={(event) => setUrl(event.target.value)}/>
    </>
  )
}
