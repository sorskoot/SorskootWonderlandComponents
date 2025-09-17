/**
 * Load remote data from a URL. JSON or CBOR format is supported based on file extension.
 * @param url The URL to fetch data from.
 * @returns The fetched data.
 */
export declare function loadRemoteData<T>(url: string): Promise<T>;
