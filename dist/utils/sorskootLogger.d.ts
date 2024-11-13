/**
 * To enable, add --define:DEBUG=\"sorskoot\"
 */
export declare class SorskootLogger {
    debugFlagPresent: boolean;
    badges: string[];
    constructor(badge?: string | undefined, color?: string);
    log(message: string, ...args: any[]): void;
}
