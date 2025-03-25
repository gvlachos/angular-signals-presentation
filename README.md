# AngularSignalsPresentation

Angular (19.2.4) and Angular signals.

Does not use a component framework.

## Theory

Signals used for change detection to drive DOM updates is not a new concept _(1)_ _(2)_. Signals were first introduced in Angular in 2023 at version 16 with the first production implementation at version 17.

Signals offer a simplified reactive framework for change detection moving away from RxJS. At the moment they are used to manage state (read-only and writable signals), derived state (computed signal) and side effects e.g. logging (effect signal) _(3)_

At the moment signals are not implemented in Angular forms and the HttpClient, although there are some interesting developments especially on the latter _(4)_ _(5)_.

Also there is Interoperability with RxJS by using the RxJS interop package _(6)_

## Tutorial

An interactive tutorial by Maciej Wojcik (@maciej-wojcik.bsky.social) that is updated regularly can be found [here](https://angular-signals.dev/)\*

## References

- [1] [The Evolution of Signals in JavaScript](https://dev.to/this-is-learning/the-evolution-of-signals-in-javascript-8ob)
- [2] [A change detection, zone.js, zoneless, local change detection, and signals story](https://justangular.com/blog/a-change-detection-zone-js-zoneless-local-change-detection-and-signals-story)
- [3] [Signals in Angular: The Future of Change Detection](https://www.angulararchitects.io/en/blog/angular-signals/)
- [4] [Angular Resource API - Everything You Have To Know (so far)](https://youtu.be/W7-lsoL-Gi8?si=-XspVgeuKiqVJBbW)
- [5] [Angular 19.2: New httpResource for HTTP Requests (First Look)](https://youtu.be/rpPndBu-6FE)
- [6] [RxJS interop with Angular signals](https://angular.dev/ecosystem/rxjs-interop)
- [*] [Angular Signals. Discover the future of Angular development through a comprehensive and interactive experience](https://angular-signals.dev)
