import { serverCheckUrl } from '../server';
import { debounceAsync, isWebUrl } from './utils';

import type { CheckURLResult } from '@shared/types';

async function checkUrl(url: string): Promise<CheckURLResult> {
    if (!isWebUrl(url)) {
        return Promise.resolve({valid: false, message: 'This is not a valid URL'});
    }

    return await serverCheckUrl(url);
}

export const checkUrlDebounced = debounceAsync(checkUrl, 500);