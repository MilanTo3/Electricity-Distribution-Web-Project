import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';

export const fader = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0) translateY(100%)'
            }),
        ], { optional: true }),
        query(':enter', [
            animate('600ms ease',
                style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ], { optional: true })
    ]),
]);

export const slider =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' }))
            ])
        ]),
    ];
}

export const transformer = trigger('routeAnimations', [
    transition('* => isLeft', translateTo({ x: -100, y: -100, rotationDeegres: -720 })),
    transition('* => isRight', translateTo({ x: 100, y: -100, rotationDeegres: 90 })),
    transition('isRight => *', translateTo({ x: -100, y: -100, rotationDeegres: 360 })),
    transition('isLeft => *', translateTo({ x: 100, y: -100, rotationDeegres: -360 }))
]);

function translateTo({ x, y, rotationDeegres }) {

    const optional = { optional: true };

    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ transform: `translate(${x}%, ${y}%) rotate(${rotationDeegres}deg)` })
        ]),
        query(':leave', [
            animate('600ms ease-out',
                style({ transform: `translate(${x}%, ${y}%) rotate(${rotationDeegres}def)` }))
        ]),
        query(':enter', [
            animate('600ms ease-out',
                style({ transform: `translate(0, 0) rotate(0)` }))
        ])
    ];
}