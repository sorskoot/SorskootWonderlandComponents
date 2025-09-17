import { decode } from '@wonderlandengine/api';
/**
 * Load remote data from a URL. JSON or CBOR format is supported based on file extension.
 * @param url The URL to fetch data from.
 * @returns The fetched data.
 */
export async function loadRemoteData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        if (url.endsWith('.json')) {
            const data = await response.json();
            return data;
        }
        else {
            const arrayBuffer = await response.arrayBuffer();
            const rawData = new Uint8Array(arrayBuffer);
            const data = decode(rawData);
            return data;
        }
    }
    catch (error) {
        console.error(`Error loading data (${url}):`, error);
        throw error;
    }
}
