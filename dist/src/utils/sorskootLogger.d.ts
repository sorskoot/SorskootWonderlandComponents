/**
 * To enable, add --define:DEBUG=\"sorskoot\"
 */
export declare class SorskootLogger {
    debugFlagPresent: boolean;
    badges: string[];
    constructor(badge?: string | undefined, color?: string);
    /**
     * Formats the message. Using this method allows you to keep the stack trace
     * intact when passing the result to console.log
     */
    f(message: string | object, ...args: any[]): any[];
    /**
     * @deprecated Use f() instead and pass the result to console.log
     */
    log(message: string, ...args: any[]): void;
}
