import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

// Paste in this variable. This will throw an error if you haven't added the adrum.js to index.html.
declare var ADRUM : any;

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'page2',
    component: Page2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
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
