import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../../app.animations';
import {
  tdBounceAnimation,
  tdCollapseAnimation,
  tdFadeInOutAnimation,
  tdFlashAnimation,
  tdHeadshakeAnimation,
  tdJelloAnimation,
  tdPulseAnimation,
  tdRotateAnimation,
} from '@covalent/core';

@Component({
  selector: 'animations-demo',
  styleUrls: ['./animations.component.scss'],
  templateUrl: './animations.component.html',
  animations: [
    slideInDownAnimation,
    tdRotateAnimation,
    tdCollapseAnimation,
    tdFadeInOutAnimation,
    tdBounceAnimation,
    tdFlashAnimation,
    tdHeadshakeAnimation,
    tdJelloAnimation,
    tdPulseAnimation,
  ],
  preserveWhitespaces: true,
})
export class AnimationsComponent {

  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;

  rotateState1: boolean = false;
  rotateState2: boolean = false;

  collapseState1: boolean = true;

  fadeInOutState1: boolean = false;

  bounceState: boolean = false;
  flashState: boolean = false;
  headshakeState: boolean = false;
  jelloState: boolean = false;
  pulseState: boolean = false;

}
