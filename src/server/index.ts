import type { CheckURLResult } from '@shared/types';

export async function serverCheckUrl(urlStr: string): Promise<CheckURLResult> {
    const result: CheckURLResult = {valid: true, message: 'URL exists', type: 'path'};

    const url = new URL(urlStr);
    const pathname = url.pathname;

    const lastSegment = pathname.split('/').pop() || '';

    const hasExtension = /\.[a-z0-9]{1,6}$/i.test(lastSegment);

    if (hasExtension) {
        result.type = 'file'
    }

    return result;
} 