import type { CheckURLResult } from '@shared/types';

function waitRandom(maxMs: number): Promise<number> {
  // Generate a random wait time between 0 and maxMs
  const randomDelay: number = Math.floor(Math.random() * maxMs);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomDelay);
    }, randomDelay);
  });
}

export async function serverCheckUrl(urlStr: string): Promise<CheckURLResult> {
  await waitRandom(1500);

  const result: CheckURLResult = {exists: true, message: 'URL exists', type: 'path'};

  const url = new URL(urlStr);
  const pathname = url.pathname;

  const lastSegment = pathname.split('/').pop() || '';

  const hasExtension = /\.[a-z0-9]{1,6}$/i.test(lastSegment);

  if (hasExtension) {
      result.type = 'file'
  }

  const nonExistentUrlPattern = /not-here|inexistent|santa-claus|easter-bunny/i;

  if (nonExistentUrlPattern.test(lastSegment)) {
      return {exists: false, message: 'URL doesn\'t exist'};
  }

  return result;
} 