# AppdSampleappAngular2


# Installation

1. Download or clone this project repository.
1. Install [NPM, Node](https://nodejs.org/en/download/), and [angular-cli](https://github.com/angular/angular-cli#installation)
1. Go into the project directory and run `npm install && ng serve`

# Configure for AppDynamics

1. Open src/index.html
1. Modify the line that reads `window["adrum-app-key"] = "FOO-BAR-BAZ";` to use your correct EUM app key.
1. Save this file and reload the web app. Click between the pages.
1. Use your browser's dev tools to see calls going to AppDynamics. You should also see Console debug messages when you change pages.

# Explanation of BRUM Changes

We have to modify 2 files to capture all of the Angular 2 route changes.

**src/index.html**
```html
<script>
  // Manually change this value
  window["adrum-app-key"] = "FOO-BAR-BAZ";
  window["adrum-start-time"] = new Date().getTime();
</script>
<!-- You can choose to pull the file from the AppDynamics CDN or host the file yourself. You must change this file location if you're hosting the file yourself. -->
<script src="https://cdn.appdynamics.com/adrum/adrum-latest.js"></script>
```

**src/app/app-routing.module.ts**
```javascript
// Paste in this variable. This will throw an error if you haven't added the adrum.js to index.html.
declare var ADRUM : any;
```

```javascript
export class AppRoutingModule {
  vpView: any;

  // APPD: Subscribe to the Router URL changes.
  constructor(public router:Router) {
      this.router.events.subscribe((event:Event) => {
              if (event instanceof NavigationEnd) {
                console.debug('NavigationEnd: '+event.url);

                this.vpView.markViewChangeEnd();
                this.vpView.markViewDOMLoaded();
                this.vpView.markXhrRequestsCompleted();
                this.vpView.markViewResourcesLoaded();
                this.vpView.end();
                ADRUM.report(this.vpView);

              } else if (event instanceof NavigationStart) {
                console.debug('NavigationStart: '+event.url);

                this.vpView = new ADRUM.events.VPageView();
                this.vpView.start();
                this.vpView.markViewChangeStart();
              }
          });
  }
}
```

# Angular 2 CLI

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
