import {animate, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, flip, slideInRight} from "ng-animate";

export const productPageAnimation = trigger('productPage', [
  transition(':enter', useAnimation(fadeIn))
])

export const productPageMenuAnimation = trigger('productPageMenu', [
  transition(':enter', useAnimation(slideInRight))
])


export const basketLengthAnimation = trigger('basketLength', [
  transition(':increment', [animate(500, style({transform: 'scale(1.5)'})), animate(500, style({transform:'scale(1)'}))])
])

export const pictureItemAnimation = trigger('pictureItem', [transition(':enter', useAnimation(flip))])
