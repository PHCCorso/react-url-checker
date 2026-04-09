export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
    // Clears the existing timer every time the function is called
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, wait);
    });
  };
}

export function isWebUrl(urlPath: string): boolean {
  try {
    const url = new URL(urlPath);
   
    const hasWebProtocol = ["http:", "https:"].includes(url.protocol);
    const hasTld = url.hostname.replace(/^www\./, '').includes('.');
    const isValidHost = !url.hostname.endsWith('.');
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

    return (hasWebProtocol && hasTld && isValidHost) || isLocal;
  } catch {
    return false;
  }
}