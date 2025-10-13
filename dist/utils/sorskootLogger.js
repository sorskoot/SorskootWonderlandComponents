/**
 * To enable, add --define:DEBUG=\"sorskoot\"
 */
export class SorskootLogger {
    constructor(badge = undefined, color = '#e92a7d') {
        this.debugFlagPresent = false;
        if (typeof DEBUG !== 'undefined') {
            this.debugFlagPresent = true;
        }
        if (!WL_EDITOR && window.location.href.includes('sorskoot_debugger')) {
            this.debugFlagPresent = true;
        }
        var r = 'border-radius: 8px; padding: 2px 4px; color: white;';
        const defaultBadge = ['%cSORSKOOT', 'background-color: #e92a7d; '.concat(r)];
        if (badge) {
            this.badges = [
                `${defaultBadge[0]}%c %c${badge}`,
                defaultBadge[1],
                '',
                `background-color: ${color};`.concat(r),
            ];
            console.dir(this.badges);
        }
        else {
            this.badges = defaultBadge;
        }
    }
    /**
     * Formats the message. Using this method allows you to keep the stack trace
     * intact when passing the result to console.log
     */
    f(message, ...args) {
        return [...this.badges, message, ...args];
    }
    /**
     * @deprecated Use f() instead and pass the result to console.log
     */
    log(message, ...args) {
        if (!this.debugFlagPresent)
            return;
        console.log.apply(console, [...this.badges, message, ...args]);
    }
}
