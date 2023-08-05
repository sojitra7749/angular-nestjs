import { animate, style, transition, trigger } from "@angular/animations";

export const openClose = trigger('openClose', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.95)'
    }),
    animate('100ms ease-out', style({
      opacity: 1,
      transform: 'scale(1)'
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'scale(1)'
    }),
    animate('75ms ease-in', style({
      opacity: 0,
      transform: 'scale(0.95)'
    }))
  ])
]);
