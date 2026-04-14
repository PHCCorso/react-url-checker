import { useState, useEffect } from 'react'
import { checkUrlDebounced, isWebUrl } from './utils';

import type { CheckURLResult } from '@shared/types';

export function UrlCheckInput() {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState<boolean | undefined>(undefined);
  const [urlExistenceResult, setUrlExistenceResult] = useState<CheckURLResult | undefined>(undefined);

  useEffect(() => {
    let ignore = false;
    setUrlExistenceResult(undefined);

    if (!url) {
      setIsValidUrl(undefined);

      return;
    };

    const urlValidityResult = isWebUrl(url);

    setIsValidUrl(urlValidityResult);

    if (urlValidityResult) {
      checkUrlDebounced(url)
        .then(result => {
          if (!ignore) { // Only update state if the effect is still valid
            setUrlExistenceResult(result);
          }
        });
    }

    return () => {
      ignore = true; // Cleanup when the component unmounts or url changes
    };
  }, [url]);

  return (
    <>
        {isValidUrl === false && <span>This is not a valid URL</span>}
        {isValidUrl === true && !urlExistenceResult ? <span>Checking...</span> : null}
        {urlExistenceResult && <span>{urlExistenceResult.message} {urlExistenceResult.type && `| Type: ${urlExistenceResult.type}`}</span>}
        <input onChange={(event) => setUrl(event.target.value)}/>
    </>
  )
}
