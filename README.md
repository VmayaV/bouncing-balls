# Bouncing balls

This project was generated with angular version 9.0.0-next.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests with coverage

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deploying app on github pages

Run `ng deploy` to deploy app on https://vmayav.github.io/bouncing-balls/ from gh-pages branch.


## The app

The app is simple canvas playground, from where balls are fired. The numbers of the balls is random generated, as same as the width,
angle, speed from the coordinates where the user clicks on the screen.

After the balls are firedm they are hitting the ground and on every hit they are lossing energy, so their speed is reducing for some percentage. Also there is some friction that influence the speed of the ball when they touch the ground.
