import { AnimationComponent, Component } from '@wonderlandengine/api';
/**
 * This component starts or stops the animation of the object it is attached to
 * Starts when the object is activated, stops when it is deactivated.
 *
 * Works only on Wonderland Animations
 */
export class StartStopAnimationOnActivate extends Component {
    static TypeName = 'start-stop-animation-on-activate';
    onActivate() {
        const animationC = this.object.getComponent(AnimationComponent);
        if (animationC) {
            animationC.play();
        }
    }
    onDeactivate() {
        const animationC = this.object.getComponent(AnimationComponent);
        if (animationC) {
            animationC.stop();
        }
    }
}
