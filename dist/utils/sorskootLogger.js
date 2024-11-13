/**
 * To enable, add --define:DEBUG=\"sorskoot\"
 */
export class SorskootLogger {
    debugFlagPresent = false;
    badges;
    constructor(badge = undefined, color = '#e92a7d') {
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
    log(message, ...args) {
        if (!this.debugFlagPresent)
            return;
        console.log.apply(console, [...this.badges, message, ...args]);
    }
}
